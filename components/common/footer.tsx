import Image from "next/image";
import React from "react";
import { Dancing_Script } from "next/font/google";
import Link from "next/link";
import { BsInstagram } from "react-icons/bs";
import { SiWhatsapp } from "react-icons/si";


const dancing_script = Dancing_Script({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export default function Footer() {
  return (
    <footer className={`py-6 border-t rounded-t-3xl`}>
      <div className="container grid md:grid-cols-3 sm:grid-cols-1 sm:gap-y-6 md:gap-y-0">
        <ul className="flex flex-col items-center justify-start gap-y-4">
          <Image
            src="/images/akya-logo.png"
            alt="akya-logo.png"
            width={100}
            height={100}
          />
          <h1 className={`${dancing_script.className} text-4xl`}>Akya Butik</h1>
          <p className="max-w-64 text-lg text-center">
            Erenköy Mah. 4875 sok. no:78 7 nolu dükkan (B) KEPEZ / ANTALYA
          </p>
        </ul>

        <ul className="flex flex-col items-center justify-start gap-y-4">
          <h1 className="text-2xl font-[700]">Sosyal Medya</h1>
          <li>
            <Link href="https://www.instagram.com/akyabutik/" target="_blank" className="hover:text-indigo-600">
              <BsInstagram size={24} />
            </Link>
          </li>
          <li>
            <Link href="/men" className="hover:text-indigo-600">
            <SiWhatsapp size={24} />
            </Link>
          </li>
        </ul>
        <ul className="flex flex-col items-center justify-start gap-y-4">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3189.117439165436!2d30.670249999999996!3d36.9353608!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14c38f2bbc76a7cd%3A0x4404d36882040ff5!2sAkya%20Butik!5e0!3m2!1str!2str!4v1727614010571!5m2!1str!2str"
          width="350"
          height="200"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
        </ul>
        
      </div>
      <div className="container text-xs underline flex flex-row justify-center gap-x-6 items-center py-4">
        <Link href='/iptal-iade-politikasi'>iptal ve iade politikası</Link>
        <Link href='/mesafeli-satis-sozlesmesi'>mesafeli satış sözleşmesi</Link>
        <Link href='/kvkk'>kvkk</Link>
      </div>
    </footer>
  );
}
