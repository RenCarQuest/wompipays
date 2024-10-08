import { NextResponse } from "next/server";
import crypto from "crypto";

const WOMPI_PUB = process.env.WOMPI_PUB;
const WOMPI_PRIV = process.env.WOMPI_PRIV;
const WOMPI_INTEGRITY = process.env.WOMPI_INTEGRITY;

export async function GET(request) {
  const invoice = generateSecureInvoiceCode();
  const amount = 2490000; // Example amount in cents
  const currency = "COP"; // Example currency

  console.log(invoice);

  const concatenatedString = `${invoice}${amount}${currency}${WOMPI_INTEGRITY}`;
  const hash = generateSHA256Hash(concatenatedString);

  const res = {
    render: "button",
    signature: hash,
    src: "https://checkout.wompi.co/widget.js",
    publickey: WOMPI_PUB,
    datacurrency: currency,
    dataamountincents: amount,
    datareference: invoice,
  };

  return NextResponse.json(res);
}

function generateSecureInvoiceCode() {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";
  let code = "";
  for (let i = 0; i < 8; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    code += characters[randomIndex];
  }
  return code;
}

function generateSHA256Hash(data) {
  return crypto.createHash("sha256").update(data).digest("hex");
}
