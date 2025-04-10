"use client";

import { useState } from "react";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("https://devzapp.com.br/api-send-message-official/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Client-Token": "bca38b24a804aa37d821d31af00f5598230122c5bbfc4c4ad5ed40e4258f04ca"
        },
        body: JSON.stringify({
          phone: "5511944771631",
          typeSent: "LISTA_OPCOES",
          phoneNumberId: "480515458488155",
          campaignId: "678a79a0aeb95b00013b27d8",
          bodyText: "Escolha qualquer coisa",
          footerText: "Footer se quiser",
          buttonName: "Escolhe ai comedia",
          sections: [
            {
              rows: [
                {
                  id: "1",
                  title: "Botão 1",
                  description: "Descrição do botão 1"
                },
                {
                  id: "2",
                  title: "Botão",
                  description: "Descrição do botão 2"
                }
              ]
            }
          ]
        }),
      });

      const data = await response.json();
      setResponse(data);
    } catch (error) {
      console.error("Error:", error);
      setResponse(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-8 flex flex-col items-center justify-center">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Send WhatsApp Message
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {isLoading ? "Sending..." : "Send Message"}
            </button>
          </div>
        </form>

        {response && (
          <div className="mt-4 p-4 bg-gray-100 rounded-md">
            <h3 className="text-lg font-medium mb-2">Response:</h3>
            <pre className="whitespace-pre-wrap text-sm">
              {JSON.stringify(response, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
