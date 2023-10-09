"use client";
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import Image from "next/image";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import { useRef, useState } from "react";

export default function CupomButton({ productCode }: { productCode: string }) {
  const [state, setState] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter()

  async function onValidate(formData: FormData) {
    const code = formData.get('code') as string
    console.log(code, productCode)
    if(productCode == code) {
      router.replace(`${window.location.pathname}?code=${code}`)
      setState(false)
    } else {
      inputRef.current?.setCustomValidity('Cupom inválido')
      formRef.current?.reset();
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setState(true)}
        className=" bg-gray-900 text-white py-2 px-4 rounded-full font-bold hover:bg-gray-800"
      >
        🔒Cupom
      </button>
      <div className={`fixed inset-0 z-10 overflow-y-auto ${state ? '' : 'hidden'}`}>
        <div
          className="fixed inset-0 w-full h-full bg-black opacity-40"
          onClick={() => setState(false)}
        ></div>
        <div className="flex items-center min-h-screen px-4 py-8">
          <div className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg">
            <div className="flex justify-end">
              <button
                className="p-2 text-gray-400 rounded-md hover:bg-gray-100"
                onClick={() => setState(false)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 mx-auto"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
            <div className="max-w-sm mx-auto py-3 space-y-3 text-center">
              <h4 className="text-lg font-medium text-gray-800">
                Digitar o cupom de desconto
              </h4>
              <p className="text-[15px] text-gray-600">
                Para receber os cupons participe do nosso grupo de <a className="text-blue-500" rel="stylesheet" href="/">whatsapp</a>
              </p>
              <form action={onValidate} ref={formRef}>
                <div className="relative">
                  <svg
                    className="w-6 h-6 text-gray-400 absolute left-3 inset-y-0 my-auto"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                    />
                  </svg>
                  <input
                    type="text"
                    name="code"
                    ref={inputRef}
                    required
                    onChange={() => inputRef.current?.setCustomValidity('')}
                    placeholder="Digite o cupom"
                    className="w-full pl-12 pr-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                  />
                </div>
                <button className={`block w-full mt-3 py-3 px-4 font-medium text-sm text-center text-white bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 rounded-lg ring-offset-2 ring-indigo-600 focus:ring-2`}>
                  Aplicar
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
