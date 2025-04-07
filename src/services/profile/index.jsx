export const ImageCard = ({ image, title, subTitle }) => {
  return (
    <div className={`flex flex-col items-center justify-center gap-4`}>
      <div>
        {image ? (
          <img
            style={{ imageRendering: "-webkit-optimize-contrast" }}
            className={`img-card-avatar object-cover`}
            src={image}
            alt="Avatar"
          />
        ) : title ? (
          <div className={`img-card-avatar  text-gray-500`}>
            <p className="text-3xl">{title?.charAt(0).toUpperCase()}</p>
          </div>
        ) : null}
      </div>

      <div className="flex-1 min-w-0 flex justify-center items-center flex-col gap-1">
        <div className="md:text-base text-sm font-semibold text-gray-800 dark:text-gray-200">
          {title}
        </div>

        <div
          className={`text-gray-600 dark:text-gray-400 break-words whitespace-pre-line`}
        >
          {subTitle}
        </div>
      </div>
    </div>
  );
};

export const CountCard = ({ count = 0, title }) => (
  <div className="dark:bg-dark_bg_5 bg-white shadow-sm rounded-xl p-4 w-full text-center border">
    <h2 className="text-2xl font-semibold dark:text-dark_text_1 text-dark_bg_4">
      {count}
    </h2>
    <p className="text-sm text-gray-500 mt-1">{title}</p>
  </div>
);
