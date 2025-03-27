import React from "react";
import { nameElipse } from "../../utils/common/nameElipse";

const LetterCard = ({
  userImage,
  signImage = null,
  address,
  date,
  subject,
  onClick,
}) => {
  return (
    <div onClick={onClick} className={` ${!signImage && "pb-5"} letter-card`}>
      {/* User Profile Image */}
      <img
        src={userImage}
        className="w-8 h-8 object-cover rounded-full border border-gray-200"
        alt="User"
      />

      {/* Date and Address */}
      <div className="w-full flex items-center justify-end gap-1 mb-2 my-1">
        <p className="text-xs font-semibold">{nameElipse(address, 9)},</p>
        <p className="text-xs font-semibold">
          {new Date(date).toLocaleDateString("en-US", {
            dateStyle: "long",
          })}
        </p>
      </div>

      {/* Subject */}
      <div className="flex items-center gap-1">
        <span className="text-sm font-semibold">Subject:</span>
        <span className="text-xs">{nameElipse(subject, 20)}</span>
      </div>

      {/* Signature */}
      {signImage && (
        <div className="w-full flex justify-end mt-2">
          <img
            src={signImage}
            className="w-16 h-16 object-contain"
            alt="sign"
            style={{
              imageRendering: "-webkit-optimize-contrast",
            }}
          />
        </div>
      )}
    </div>
  );
};

export default LetterCard;
