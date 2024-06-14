"use client"
import Script from "next/script";
import { useState } from "react";
import { PulseLoader } from "react-spinners";

export default function Home() {
  const [formLoading, setFormLoading] = useState(true);
  const apikey = process.env.NEXT_PUBLIC_MONEY_COLLECT_PUBLIC_KEY ?? "";

  let moneyCollect: any;

  let params = {
      formId: "payment-form", // form id
      frameId: "PrivateFrame", // generated IframeId
      // mode: "test",
      needCardList: true,
      autoValidate: true,
      modelType: "normal",
      lang: "en", // Form display and verification information language
      layout: {
        pageMode: "block", // Style mode of the page   inner | block
        style: {
          frameMaxHeight: "100", //  The max height of iframe
          input: {
            FontSize: "14", // Collect the size of the font
            FontFamily: "Arial", // Specify a prioritized list of one or more font family names
            FontWeight: "400", // Collect the weight (or boldness) of the font
            Color: "#32325d", // Collect the foreground color value of an element's text
            ContainerBorder: "1px solid #E6E6E6", //Collect the name of the font
            ContainerBg: "#fff", // Collect the weight (or boldness) of the font
            ContainerSh: "0 0 0 0.5px rgb(50 50 93 / 10%), 0 2px 5px 0 rgb(50 50 93 / 10%), 0 1px 1.5px 0 rgb(0 0 0 / 7%)", //Collect the color of the font
          },
        },
      },
    };

  return (
    <div>
      <Script
        async
        src="https://static.moneycollect.com/jssdk/js/MoneyCollect.js"
        onLoad={() => {
            //@ts-ignore
            moneyCollect = MoneycollectPay(apikey);            
            moneyCollect.elementInit("payment_steps", params).then(() => setFormLoading(false));
          }}
        onError={(e: Error) => {
            console.error('Script failed to load', e)
          }}
      ></Script>
      <div className="sr-root p-10 m-auto w-full md:w-1/2">
        <div className="payment-view">
          {/* Payment form */}
          <form
            id="payment-form"
            className="chec-form w-full self-center shadow rounded-lg p-10 min-w-min"
          >
            <div id="card-element" className="ab-element relative">
              {formLoading &&
              <div className="absolute top-1/2 left-1/2">
                <PulseLoader
                color="#5469d4"
                />
              </div>
              }
              {/* MoneyCollect.js injects the Payment Element here */}
            </div>
            <div className="sr-field-error" id="card-errors" role="alert"></div>
            {!formLoading &&
            <button 
          id="submit"
        className="bg-[#5469d4] text-white font-serif text-base font-semibold cursor-pointer block transition ease-in-out duration-200 shadow w-full hover:filter disabled:opacity-50 disabled:cursor-default rounded p-2" 
      >
              <span id="button-text">
                Pay now
              </span>
            </button>            
            }
          </form>
        </div>
      </div>
    </div>
  );
}
