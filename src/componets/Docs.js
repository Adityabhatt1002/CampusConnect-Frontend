import React,{useRef} from "react";
import { FilePlus } from "lucide-react";

const FileUploadButton =({onFileSelect})=>{
    const inputRef =useRef();
    
    const handleClick =()=>{
      inputRef.current.click();
    };
    const handleChange=(e)=>{
      
      const file=e.target.files[0];
      console.log("Selected file:", e.target.files[0]);
      if(file) onFileSelect(file);
    };
    return (
    <>
      <button
        onClick={handleClick}
        className="text-white bg-gray-700 hover:bg-gray-600 px-3 py-2 rounded"
        title="Attach file"
      >
        <FilePlus size={18} />
      </button>
      <input
        type="file"
        ref={inputRef}
        onChange={handleChange}
        className="hidden"
        accept=".jpg,.jpeg,.png,.pdf,.docx,.pptx"
      />
    </>
  );
};

export default FileUploadButton;