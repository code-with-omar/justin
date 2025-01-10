export default function ResultCard({
  color_code,
  color_name,
  brand,
  year_range,
  imageurl,
  onClick,
}) {
  const isColorCode =
    /^#[0-9A-F]{6}$/i.test(imageurl) || /^rgb/i.test(imageurl);

  return (
    <div
      className="card cursor-pointer p-2 border-solid border-[#e5e7eb] border-2 rounded-xl "
      onClick={onClick} // Use handleClick here
    >
      <figure
        style={{
          background: isColorCode ? imageurl : imageurl,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
        className="card-figure h-40 w-full rounded-xl"
      />
      <div className="my-3">
        <h6 className="text-xs font-semibold leading-4 my-2">
          {color_code} / {color_name}
        </h6>
        <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center">
          <p className="text-xs mt-2 font-semibold leading-4 text-[#00000099] ">
            {brand}
          </p>
          <p className="text-xs  leading-4 mt-2 md:mt-0 font-normal text-[#00000099]">
            {year_range}
          </p>
        </div>
      </div>
    </div>
  );
}
