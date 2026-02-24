import HomePower from "./home-power";
import HomeVendor from "./home-vendor";

export default function HomePowerVendor({ powerData, vendorData }) {
  return (
    <section className="w-full h-auto block bg-black py-10 xl:py-15 2xl:py-16 3xl:py-20">
      <div className="container xl:max-w-[1250px] 2xl:max-w-[1500px] 3xl:max-w-[1870px]">
        <div className="flex flex-wrap gap-3 sm:gap-x-2 lg:gap-x-3 xl:gap-x-4 2xl:gap-x-4.5 3xl:gap-x-6">
          <div className="w-full sm:flex-1">
            <HomePower data={powerData} />
          </div>

          <div className="w-full sm:w-[200px] lg:w-[268px] xl:w-[310px] 2xl:w-[376px] 3xl:w-[570px]">
            <HomeVendor data={vendorData} />
          </div>
        </div>
      </div>
    </section>
  );
}
