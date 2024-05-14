import React, { useState } from 'react';

function Result({ saltSuggestions, isLoading }) {
    if (isLoading || saltSuggestions.length === 0) {
        return (
            <div className='w-screen h-screen  flex  items-center justify-center'>
                <h1 className='text-slate-400 font-semibold'>"Find medicines with amazing discount"</h1>
            </div>
        );
    }

    return (
        <div className='flex items-center flex-col'>
            {saltSuggestions.map((salt, index) => {
                const [selectForm,setSelectForm] = useState("Tablet")
                const saltforms = Object.keys(salt.salt_forms_json[selectForm]);
                const pack = salt.salt_forms_json.Tablet['50mg'] ? Object.keys(salt.salt_forms_json.Tablet['50mg']) : [];
                const [showMoreStrength, setshowMoreStrength] = useState(false);
                const [num, setNum] = useState(4);

                const handleShowMore = () => {
                    setshowMoreStrength(!showMoreStrength);
                    showMoreStrength ? setNum(4) : setNum(10);
                };

                return (
                    <div className='bg-gradient-to-r from-white via-white to-[#e6f1f1] w-[1007px] min-h-[180px] rounded-lg border flex mt-8 p-2 flex justify-between ' key={index}>
                        <div className="resultCardLeft  w-[41%]  flex flex-col justify-between gap-4">
                            <div className='flex justify-start'>
                                <p className='mr-[37px]'>Forms : </p>
                                <div className="grid grid-cols-2 gap-2">
                                    {salt.available_forms.map((form, formIndex) => (
                                        <span
                                         className=' border border-black px-2 py-1 rounded-md text-center cursor-pointer '
                                         key={formIndex}
                                         onClick={()=>{setSelectForm(form)}}
                                         value={form}
                                         >
                                            {form}
                                         </span>
                                    ))}
                                </div>
                            </div>
                            <div className='flex justify-start'>
                                <p className='mr-5 '>Strength : </p>
                                <div className="grid grid-cols-2 gap-2">
                                    {saltforms.slice(0, num).map((strength, strengthIndex) => (
                                        <span className=' border border-black px-2 py-1 rounded-md text-center cursor-pointer ' key={strengthIndex}>{strength}</span>
                                    ))}
                                     {saltforms.length > 4 && (
                                    <button onClick={handleShowMore} className="text-green-500 font-bold ">
                                        {showMoreStrength ? 'Hide' : ' More'}
                                    </button>
                                )}
                                </div>
                               
                            </div>
                            <div className='flex justify-start'>
                                <p className='mr-2 '>Packaging :</p>
                                <div className="grid grid-cols-2 gap-2">
                                    {pack.map((key, packIndex) => (
                                        <span className=' border border-black px-2 py-1 rounded-md text-center cursor-pointer ' key={packIndex}>{key}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="resultCardMiddle   w-[30%]  flex flex-col justify-center items-center ">
                            <p className='font-semibold'>{salt.salt}</p>
                            <p className='text-[14px] text-slate-400'>{salt.most_common.Form} | {salt.most_common.Strength} | {salt.most_common.Packing}</p>
                        </div>
                        <div className="resultCardRight  w-[30%]  flex justify-center items-center">
                            <p className='text-[28px] font-bold'>From $70</p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default Result;
