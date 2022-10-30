import fetch from "node-fetch";
import * as fs from "fs";
import * as readline from "readline/promises";

const rl: readline.Interface = readline.createInterface({"input": process.stdin, "output": process.stdout});

process.title = "Xbox Promo Checker | Telegram @DollarNoob";

(async function() {
    if (!fs.existsSync("codes.txt")) {
        console.log("[-] No codes.txt found!");

        await rl.question("").then(() => rl.close());
        process.exit(1);
    }

    const auth: string = await rl.question("\x1b[1m\x1b[34m[?] Please Enter Your Authorization Header: ");
    rl.close();

    console.clear();

    const codes: Array<string> = fs.readFileSync("codes.txt", "utf-8").trim().split(/\r?\n/);
    for (const code of codes) {
        var codeInfo: any;
        while (true) {
            codeInfo = await fetch(`https://purchase.mp.microsoft.com/v7.0/tokenDescriptions/${code}?market=US&language=en-US`, {
                "headers": {
                    "authorization": auth
                }
            });

            switch(codeInfo.status) {
                case 200:
                case 403:
                    break;
                case 401: {
                    console.log("\x1b[31m[-] Bad Authorization Header");

                    const _ = readline.createInterface({"input": process.stdin, "output": process.stdout});
                    await _.question("").then(() => _.close());

                    process.exit(1);
                }
                case 404:
                    console.log("\x1b[31m[-] " + code);
                    break;
                case 429: {
                    fs.appendFileSync("errors.txt", code + "\n");

                    console.log("\x1b[33m[!] Rate Limited, retrying in 30 seconds");
                    await new Promise(resolve => setTimeout(resolve, 60000));

                    break;
                }
                default: {
                    console.log(`\x1b[31m[-] ${codeInfo.status} - ${await codeInfo.text()}`);

                    const _ = readline.createInterface({"input": process.stdin, "output": process.stdout});
                    await _.question("").then(() => _.close());

                    process.exit(1);
                }
            }

            if (codeInfo.status !== 429) break;
        }

        if (codeInfo.status === 404) continue;

        try {
            codeInfo = await codeInfo.text();
            codeInfo = JSON.parse(codeInfo);
        }
        catch {}

        if (typeof codeInfo !== "object") {
            console.log("\x1b[31m[-] - " + codeInfo);

            const _ = readline.createInterface({"input": process.stdin, "output": process.stdout});
            await _.question("").then(() => _.close());

            process.exit(1);
        }

        if (codeInfo.tokenState === "Active") {
            if (codeInfo.assetId !== "PGP-00047") {
                console.log("\x1b[33m[!] Code is not a Xbox Gamepass code!");
                continue;
            }

            console.log("\x1b[32m[+] 1 Month - " + code);
            fs.appendFileSync("1month.txt", code + "\n");
        }
        else if (codeInfo.tokenState === "Redeemed") {
            console.log("\x1b[31m[-] " + code);
        }
        else if (codeInfo.code === "Forbidden") {
            if (codeInfo.innererror?.details[0]?.message !== "PGP-00016") {
                console.log(`\x1b[31m[-] ${codeInfo.innererror?.message} - ${codeInfo.innererror?.data[0]} - ${codeInfo.innererror?.data ? codeInfo.innererror.data[codeInfo.innererror.data.length - 1] : ""}`);
                continue;
            }
            console.log("\x1b[32m[+] 3 Month - " + code);
            fs.appendFileSync("3month.txt", code + "\n");
        }
        else console.log("\x1b[31m[-] " + JSON.stringify(codeInfo));
    }

    console.log("\n\x1b[33m[!] Finished All Tasks!\x1b[0m");

    const _ = readline.createInterface({"input": process.stdin, "output": process.stdout});
    await _.question("").then(() => _.close());
    process.exit(0);
})();