import React from "react";

export default function FieldsetTextarea({
  label,
  required = false,
  register = {},
  ...textareaProps
}) {
  return (
    <div className="relative min-w-[fit-content] w-full group">
      <textarea
        className="outline-none border-none px-3 py-3 peer min-h-[100px] resize-y w-full"
        placeholder=" "
        {...register}
        {...textareaProps}
      />

      <label
        className="absolute left-[9px] top-px text-sm text-gray-500 transition-all duration-300 px-1 transform -translate-y-1/2 pointer-events-none 
        peer-placeholder-shown:top-6 peer-placeholder-shown:text-lg group-focus-within:!top-px group-focus-within:!text-sm group-focus-within:!text-primary"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      {/* Border and notch for transition */}
      <fieldset
        className="inset-0 absolute border border-slate-300 pointer-events-none mt-[-9px] invisible peer-placeholder-shown:visible 
        group-focus-within:!border-primary group-focus-within:border group-hover:border-primary"
      >
        <legend className="ml-2 px-0 text-sm transition-all duration-300 invisible max-w-[0.01px] group-focus-within:max-w-full group-focus-within:px-1 whitespace-nowrap">
          {label} {required && <span className="text-red-500">*</span>}
        </legend>
      </fieldset>

      {/* Visible notch when filled */}
      <fieldset
        className="inset-0 absolute border border-slate-300 pointer-events-none mt-[-9px] visible peer-placeholder-shown:invisible 
        group-focus-within:border group-focus-within:!border-blue-500 group-hover:border-primary"
      >
        <legend className="ml-2 text-sm invisible px-1 max-w-full whitespace-nowrap">
          {label} {required && <span className="text-red-500">*</span>}
        </legend>
      </fieldset>
    </div>
  );
}
