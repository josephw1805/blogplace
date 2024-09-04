import Image from "next/image";
import Marquee from "react-fast-marquee";

const partners = [
  {
    url: "https://utfs.io/f/99684810-8c07-4e88-9d75-7cb09c1e4d81-jnwg2x.png",
  },
  {
    url: "https://utfs.io/f/0af2aa32-1603-48bf-9060-a7fa2a3fe5d7-jnwg2y.png",
  },
  {
    url: "https://utfs.io/f/644f5e95-c0c5-4e09-8e20-56a9872017e6-jnwg2z.png",
  },
  {
    url: "https://utfs.io/f/7dd25ab0-4d48-4b27-b30e-442707e29cd0-jnwg30.png",
  },
  {
    url: "https://utfs.io/f/0f07b3f4-3215-4209-8495-84b0e5460205-jnwg31.png",
  },
];

const Partners = () => {
  return (
    <div className="py-10">
      <h2 className="text-center text-lg font-semibold leading-7">
        Trusted by the best companies in the world
      </h2>
      <div className="w-full flex justify-center pt-3">
        <div className="w-[50px] h-[2px] bg-primary" />
      </div>
      <Marquee className="w-full my-10">
        {partners.map((i, index) => (
          <Image
            src={i.url}
            alt="partner"
            key={index}
            width={200}
            height={200}
            className="mx-14 grayscale-[100%] object-contain hover:grayscale-0 transition-opacity cursor-pointer"
          />
        ))}
      </Marquee>
    </div>
  );
};

export default Partners;
