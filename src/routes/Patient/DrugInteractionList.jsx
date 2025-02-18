import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import supabase from "../../Supabase/supabase";

const fetchDrugDetails = async ({ queryKey }) => {
    const [tableName, id] = queryKey;
    const { data, error } = await supabase.from(tableName).select("*").eq("drug_id", id);
    if (error) throw new Error(error.message);
    return data || [];
};

const DrugInteractionList = ({ tableName }) => {
    const { id, name } = useParams();

    const { data: drugDetails, isLoading, error } = useQuery({
        queryKey: [tableName, id],
        queryFn: fetchDrugDetails,
    });

    if (isLoading)
        return <div className="flex justify-center items-center h-screen text-xl text-gray-700">Loading...</div>;
    if (error) return <p className="text-red-500 text-center">Error: {error.message}</p>;

    const dataWithCounsellingTips =
        tableName === "patient_interactions" && drugDetails?.[0]?.food !== "NA"
            ? [
                ...drugDetails,
                {
                    drug_id: id,
                    food: "",
                    counselling_tips: drugDetails[0]?.counselling_tips,
                    isCounsellingTips: true,
                },
            ]
            : drugDetails;

    const renderInteractionItem = (item, index) => {
        return (
            <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-white p-5 mb-4 rounded-2xl shadow-lg border border-gray-200"
            >
                <div className="p-3 bg-gray-100 rounded-lg">
                    <p className="text-lg font-semibold text-gray-900">
                        {item.food === "NA" ? "No Interaction Available" : item.food}
                    </p>
                </div>

                <div className="mt-2 border-t pt-2">
                    {item.mechanism_of_action && (
                        <p className="text-gray-700">
                            <span className="font-bold">Mechanism:</span> {item.mechanism_of_action}
                        </p>
                    )}
                    {item.severity && (
                        <p className="text-gray-700">
                            <span className="font-bold">Severity:</span> {item.severity}
                        </p>
                    )}
                    {item.management && (
                        <p className="text-gray-700">
                            <span className="font-bold">Management:</span> {item.management}
                        </p>
                    )}
                    {item.reference && (
                        <p className="text-gray-700 overflow-auto">
                            <span className="font-bold">Reference:</span> {item.reference}
                        </p>
                    )}
                </div>
            </motion.div>
        );
    };

    return (
        <div className="min-h-screen flex flex-col md:flex-row">
            {/* Sidebar Placeholder (Ensure space for sidebar) */}
            <div className="hidden md:block w-1/4 bg-gray-200 p-4">Sidebar</div>

            {/* Main Content */}
            <div className="w-full md:w-3/4 p-8">
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white p-6 rounded-2xl shadow-xl border border-gray-200"
                >
                    <h2 className="text-3xl font-semibold text-gray-800 text-center">
                        Drug Name: <span className="text-blue-600">{name}</span>
                    </h2>
                </motion.div>
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 auto-rows-auto">
                    {dataWithCounsellingTips?.map((item, index) => renderInteractionItem(item, index))}
                </div>
            </div>
        </div>
    );
};

export default DrugInteractionList;