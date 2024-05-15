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
                const [selectForm, setSelectForm] = useState("Tablet")
                const saltForms = salt.salt_forms_json[selectForm];
                const saltStrengths = Object.keys(saltForms);
                
                const [selectedStrength, setSelectedStrength] = useState(saltStrengths[0]);
                const [selectedPackaging, setSelectedPackaging] = useState(Object.keys(saltForms[selectedStrength])[0]); // State to track selected packaging
                const [showMoreStrength, setShowMoreStrength] = useState(false);
                const [showMoreForm, setShowMoreForm] = useState(false);
                const [showMorePack, setShowMorePack] = useState(false);
                const [numStrength, setNumStrength] = useState(4);
                const [numForm, setNumForm] = useState(4);
                const [numPack, setNumPack] = useState(4);

                const handleShowMoreStrength = () => {
                    setShowMoreStrength(!showMoreStrength);
                    showMoreStrength ? setNumStrength(4) : setNumStrength(10);
                };
                const handleShowMoreForm = () => {
                    setShowMoreForm(!showMoreForm);
                    showMoreForm ? setNumForm(4) : setNumForm(10);
                };
                const handleShowMorePack = () => {
                    setShowMorePack(!showMorePack);
                    showMorePack ? setNumPack(4) : setNumPack(10);
                };

                return (
                    <div className='bg-gradient-to-r from-white via-white to-[#e6f1f1] w-[1007px] min-h-[180px] rounded-lg shadow-lg flex mt-8 p-2 flex justify-between ' key={index}>
                        <div className="resultCardLeft  w-[41%]  flex flex-col justify-between gap-4">
                            <div className='flex justify-start'>
                                <p className='mr-[37px]'>Forms : </p>
                                <div className="grid grid-cols-2 gap-2">
                                    {(salt.available_forms).slice(0, numForm).map((form, formIndex) => (
                                        <span
                                            className={`border border-black px-2 py-1 rounded-md text-center cursor-pointer ${form === selectForm ? 'border-[#112D31] border-2' : 'border-gray-300'} ${form === selectForm ? 'font-semibold' : ''}`}
                                            key={formIndex}
                                            onClick={() => { setSelectForm(form) }}
                                            value={form}
                                        >
                                            {form}
                                        </span>
                                    ))}
                                    {(salt.available_forms).length > 4 && (
                                        <button onClick={handleShowMoreForm} className="text-green-500 font-bold ">
                                            {showMoreForm ? 'Hide' : ' More'}
                                        </button>
                                    )}
                                </div>
                            </div>
                            <div className='flex justify-start'>
                                <p className='mr-5 '>Strength : </p>
                                <div className="grid grid-cols-2 gap-2">
                                    {saltStrengths.slice(0, numStrength).map((strength, strengthIndex) => (
                                        <span
                                            className={`border border-black px-2 py-1 rounded-md text-center cursor-pointer ${strength === selectedStrength ? 'border-[#112D31] border-2' : 'border-gray-300'} ${strength === selectedStrength ? 'font-semibold' : ''}`}
                                            key={strengthIndex}
                                            onClick={() => { setSelectedStrength(strength) }}
                                        >
                                            {strength}
                                        </span>
                                    ))}
                                    {saltStrengths.length > 4 && (
                                        <button onClick={handleShowMoreStrength} className="text-green-500 font-bold ">
                                            {showMoreStrength ? 'Hide' : ' More'}
                                        </button>
                                    )}
                                </div>
                            </div>
                            <div className='flex justify-start'>
                                <p className='mr-2 '>Packaging :</p>
                                <div className="grid grid-cols-2 gap-2">
                                    {saltForms[selectedStrength] &&
                                        Object.entries(saltForms[selectedStrength]).slice(0,numPack).map(([packing, products]) => {
                                            return (
                                                <span
                                                    className={`border border-black px-2 py-1 rounded-md text-center cursor-pointer ${packing === selectedPackaging ? 'border-[#112D31] border-2' : 'border-gray-300'} ${packing === selectedPackaging ? 'font-semibold' : ''}`}
                                                    key={packing}
                                                    onClick={() => { setSelectedPackaging(packing) }} // Update selected packaging
                                                >
                                                    {packing} 
                                                </span>
                                            );
                                        })
                                    }
                                    {Object.entries(saltForms[selectedStrength]).length > 4 && (
                                        <button onClick={handleShowMorePack} className="text-green-500 font-bold ">
                                            {showMorePack ? 'Hide' : ' More'}
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="resultCardMiddle   w-[30%]  flex flex-col justify-center items-center ">
                            <p className='font-semibold'>{salt.salt}</p>
                            <p className='text-[14px] text-slate-400'>{salt.most_common.Form} | {salt.most_common.Strength} | {salt.most_common.Packing}</p>
                        </div>
                        <div className="resultCardRight w-[30%] flex justify-center items-center">
                            {saltForms[selectedStrength] && (() => {
                                let lowestPrice = Infinity;
                                let hasAvailableProducts = false;
                                Object.entries(saltForms[selectedStrength]).forEach(([packing, products]) => {
                                    if (packing === selectedPackaging) { // Only consider the selected packaging
                                        const availableProducts = Object.values(products).filter(product => Array.isArray(product) && product.length > 0);
                                        if (availableProducts.length > 0) {
                                            const price = availableProducts[0][0].selling_price;
                                            if (price < lowestPrice) {
                                                lowestPrice = price;
                                            }
                                            hasAvailableProducts = true;
                                        }
                                    }
                                });
                                if (hasAvailableProducts) {
                                    return <p className='text-[28px] font-bold'>From ₹{lowestPrice}</p>;
                                } else {
                                    return <p className='text-[15px] text-center border border-[#112D31] px-4 py-2 rounded-md w-[200px] bg-white'>No Store selling this product near you</p>;
                                }
                            })()}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default Result;
