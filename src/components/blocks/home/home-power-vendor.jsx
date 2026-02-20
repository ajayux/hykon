import HomePower from "./home-power";
import HomeVendor from "./home-vendor";

export default function HomePowerVendor({ powerData, vendorData }) {
  return (
    <section className="w-full h-auto block bg-black py-10 xl:py-15 2xl:py-16 3xl:py-20">
      <div className="container xl:max-w-[1250px] 2xl:max-w-[1500px] 3xl:max-w-[1870px]">
        <div className="flex flex-wrap gap-x-3 sm:gap-x-1 3xl:gap-x-6">
          <div className="w-full xl:flex-1">
            <HomePower data={powerData} />
          </div>

          <div className="w-full xl:w-[470px]">
            <HomeVendor data={vendorData} />
          </div>
        </div>
      </div>
    </section>
  );
}
