import React, { useState, useEffect } from 'react';
import { RadioGroup } from '@headlessui/react';
import classNames from '../modules';
import { CheckCircleIcon } from '@heroicons/react/solid';
import axios from 'axios'
const DeliveryMethods = ({
    listMethod = [],
    selectedDeliveryMethod,
    setSelectedDeliveryMethod = () => { },
    onChangeTypeVehicle,
    freezerChoosen,
}) => {

    return (
        <>
            {!isNaN(freezerChoosen + 1) && (
                <div className="mt-10 border-t border-gray-200 pt-10">
                    <RadioGroup
                        value={selectedDeliveryMethod}
                        onChange={setSelectedDeliveryMethod}
                    >
                        <RadioGroup.Label className="text-lg font-medium text-gray-900">
                            Delivery method
                        </RadioGroup.Label>

                        <div className="mt-4 grid grid-cols-1 gap-y-6  sm:gap-x-4 ">
                            {listMethod.map((deliveryMethod) => (

                                <RadioGroup.Option
                                    key={deliveryMethod.id}
                                    value={deliveryMethod}
                                    className={({ checked, active }) =>
                                        classNames(
                                            checked ? 'border-transparent' : 'border-gray-300',
                                            active ? 'ring-2 ring-indigo-500' : '',
                                            'relative bg-white border rounded-lg shadow-sm p-4 flex cursor-pointer focus:outline-none'
                                        )
                                    }
                                >
                                    {({ checked, active }) => (
                                        <>
                                            <div className="flex-1 flex" >
                                                <div className="flex flex-col">
                                                    <RadioGroup.Label
                                                        as="span"
                                                        className="block text-sm font-medium text-gray-900"
                                                    >
                                                        {deliveryMethod.title}
                                                    </RadioGroup.Label>
                                                    <RadioGroup.Description
                                                        as="span"
                                                        className="mt-1 flex items-center text-sm text-gray-500"
                                                    >
                                                        {deliveryMethod.turnaround}
                                                    </RadioGroup.Description>
                                                    <RadioGroup.Description className={"mt-1"}>
                                                        <div className='grid grid-cols-1  gap-3 text-sm'>
                                                            {
                                                                deliveryMethod.typeVehicle &&
                                                                deliveryMethod.typeVehicle.map((vehicle, index) => {
                                                                    return (
                                                                        <div className='items-center flex gap-1' key={index}>
                                                                            <label >
                                                                                <input
                                                                                    type="radio"
                                                                                    name="site_name"
                                                                                    onClick={(event) => {
                                                                                        onChangeTypeVehicle({ ...vehicle, ...deliveryMethod })
                                                                                    }}
                                                                                />
                                                                                &nbsp;{vehicle.name}
                                                                            </label>
                                                                        </div>
                                                                    )
                                                                })
                                                            }

                                                        </div>
                                                    </RadioGroup.Description>
                                                    <RadioGroup.Description
                                                        as="span"
                                                        className="mt-6 text-sm font-medium text-gray-900   "
                                                    >
                                                        <p className='absolute bottom-2 font-bold'>
                                                            {deliveryMethod.price}
                                                        </p>
                                                    </RadioGroup.Description>
                                                </div>
                                            </div>
                                            {
                                                checked ? (
                                                    <CheckCircleIcon
                                                        className="h-5 w-5 text-indigo-600"
                                                        aria- hidden="true"
                                                    />
                                                ) : null}
                                            <div
                                                className={classNames(
                                                    active ? 'border' : 'border-2',
                                                    checked ? 'border-indigo-500' : 'border-transparent',
                                                    'absolute -inset-px rounded-lg pointer-events-none'
                                                )}
                                                aria-hidden="true"
                                            />
                                        </>
                                    )}
                                </RadioGroup.Option>
                            ))}
                        </div>
                    </RadioGroup >
                </div >
            )}

        </>

    );

}

export default DeliveryMethods;
