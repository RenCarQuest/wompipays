import { NextResponse } from "next/server";
import crypto from "crypto"; // Asegúrate de importar crypto

const WOMPI_EVENTS = process.env.WOMPI_EVENTS;

export async function POST(request) {
  // Leer el encabezado X-Event-Checksum
  const checksum = request.headers.get("X-Event-Checksum");
  console.log("X-Event-Checksum:", checksum);

  // Leer el cuerpo de la petición
  const event = await request.json();
  console.log("Event:", event);
  console.log("Event DATA:", event.data);

  // Generar el string concatenado para el hash
  const stringConcatenado = `${event.data.transaction.id}${event.data.transaction.status}${event.data.transaction.amount_in_cents}`;
  console.log("String Concatenado:", stringConcatenado);

  // Concatenar con el timestamp del evento
  const timestampconcatenado = `${stringConcatenado}${event.timestamp}`;
  console.log("Timestamp Concatenado:", timestampconcatenado);

  // Concatenar con el secreto de WOMPI_EVENTS
  const secretoConcatenado = `${timestampconcatenado}${WOMPI_EVENTS}`;
  console.log("Secreto Concatenado:", secretoConcatenado);

  // Generar el hash SHA-256
  const hashedsecret = generateSHA256Hash(secretoConcatenado);
  console.log("Hashed Secret:", hashedsecret);

  // Validar el checksum
  if (checksum !== hashedsecret) {
    console.log("Checksum invalido");
    return NextResponse.json({ message: "Checksum invalido" }, { status: 400 });
  }

  // Procesar la información de la transacción
  console.log("Transaction data:", event);

  return NextResponse.json(event);
}

function generateSHA256Hash(data) {
  return crypto.createHash("sha256").update(data).digest("hex");
}
