import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Minus, Trash2 } from "lucide-react";
import { motion } from "framer-motion";

const DrugList = () => {
  const navigate = useNavigate();
  const [selectedDrugs, setSelectedDrugs] = useState([]);

  useEffect(() => {
    const storedDrugs = JSON.parse(localStorage.getItem("selectedDrugs")) || [];
    setSelectedDrugs(storedDrugs);
  }, []);

  const removeDrug = (drugId) => {
    const updatedDrugs = selectedDrugs.filter((drug) => drug.drug_id !== drugId);
    setSelectedDrugs(updatedDrugs);
    localStorage.setItem("selectedDrugs", JSON.stringify(updatedDrugs));
  };

  const clearAllDrugs = () => {
    setSelectedDrugs([]);
    localStorage.removeItem("selectedDrugs");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 py-10">
      {/* Header */}
      <motion.div
        className="flex items-center justify-between bg-teal-700 text-white px-8 py-6 rounded-xl shadow-xl max-w-5xl mx-auto"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <button
          onClick={() => navigate(-1)}
          className="text-xl font-semibold hover:underline transition hover:opacity-80"
        >
          ← Selected Drugs
        </button>

        {selectedDrugs.length > 0 && (
          <motion.button
            className="flex items-center bg-transparent border-2 border-teal-500 text-teal-500 px-5 py-2 rounded-lg shadow-md hover:bg-teal-500 hover:text-white transition-transform transform hover:scale-105"
            onClick={clearAllDrugs}
          >
            <Trash2 size={20} className="mr-2" /> Clear All
          </motion.button>
        )}
      </motion.div>

      {/* Drug List */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-10 max-w-6xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {selectedDrugs.length > 0 ? (
          selectedDrugs.map((drug, index) => (
            <motion.div
              key={drug.drug_id}
              className="bg-white shadow-lg rounded-2xl p-6 flex flex-col items-center justify-center transition-all transform hover:-translate-y-2 hover:shadow-2xl w-full h-48 relative"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
            >
              <h3 className="text-lg font-semibold text-gray-900">{drug.drug_name}</h3>

              {/* Animated Remove Button */}
              <motion.button
                className="absolute bottom-4 bg-gray-700 text-white p-3 rounded-full hover:bg-gray-900 transition transform hover:scale-110"
                onClick={() => removeDrug(drug.drug_id)}
                whileHover={{ rotate: 15 }}
                whileTap={{ scale: 0.9 }}
              >
                <Minus size={22} />
              </motion.button>
            </motion.div>
          ))
        ) : (
          <motion.p
            className="text-center text-gray-600 col-span-full text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            No drugs selected.
          </motion.p>
        )}
      </motion.div>
    </div>
  );
};

export default DrugList;
