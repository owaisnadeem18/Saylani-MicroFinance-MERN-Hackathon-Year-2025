import React from "react";
import { heroImage } from "../assets";
import { Button } from "./ui/button";

const HeroSection = () => {
  return (
    <div className="min-h-[calc(100dvh-88px)] flex justify-center items-center"  >
          <div className="container mx-auto max-w-7xl px-6 py-8 lg:py-0">
      <div className="flex flex-col md:flex-row items-center gap-10">

        {/* Left Content */} 
        <div className="flex-1 text-center md:text-left flex flex-col gap-5 sm:items-start">
          <h1 className="text-3xl md:text-5xl leading-15 sm:leading-20 font-bold text-gray-800">
            مَنْ ذَا الَّذِیْ یُقْرِضُ اللّٰهَ قَرْضًا حَسَنًا فَیُضٰعِفَهٗ لَهٗۤ اَضْعَافًا كَثِیْرَةًؕ-
          </h1>
                 
          <p className="text-xl font-semibold text-blue-700">
            — سورہ البقرہ، آیت 245
          </p>

          <p className="text-lg text-gray-700 md:pr-10 leading-relaxed">
            اللہ کے راستے میں دیا گیا قرضِ حسنہ نہ صرف ایک نیکی ہے بلکہ  
            محتاج کی دلجوئی، معاشرے کی بھلائی اور آپ کے رزق میں بے حساب برکت کا ذریعہ بنتا ہے۔
          </p>

          {/* Hadith Section */}
          <div className=" bg-gray-50 p-5 rounded-xl shadow-sm border flex flex-col gap-2">
            <p className="text-lg text-gray-800 leading-relaxed">
              نبی کریم ﷺ نے فرمایا:  
              <span className="font-bold text-gray-900">
                "جو شخص کسی تنگ دست کو مہلت دے یا اُس کا بوجھ ہلکا کر دے،
                اللہ قیامت کے دن اسے اپنے عرش کے سائے میں جگہ دے گا۔"
              </span>
            </p>
            <p className="text-sm text-gray-600">— صحیح مسلم</p>
          </div>

          <Button className = "cursor-pointer hover:bg-blue-800 transition duration-300 sm:w-auto w-fit mx-auto md:m-0" >
            Apply for Qarz-e-Hasana
          </Button>
          
        </div>

        {/* Right Image */}
        <div className="flex-1">
          <img
            src= {`${heroImage}`}
            alt="Qarz e Hasana"
            className="w-full rounded-2xl shadow-lg object-cover"
          />
        </div>

      </div>
    </div>

    </div>

  );
};

export default HeroSection;
