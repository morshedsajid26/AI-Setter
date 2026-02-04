"use client";
import InputField from "@/src/components/InputField";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { BASE_URL } from "@/src/config/api";

const Qualification = () => {
  const token = Cookies.get("accessToken");

  /* ---------------- DATA ---------------- */
  const [questions, setQuestions] = useState([]);
  const [rules, setRules] = useState([]);

  /* ---------------- MODALS ---------------- */
  const [showQuestionModal, setShowQuestionModal] = useState(false);
  const [showRuleModal, setShowRuleModal] = useState(false);

  /* ---------------- FORM ---------------- */
  const [question, setQuestion] = useState("");
  const [ruleTitle, setRuleTitle] = useState("");
  const [rulePoints, setRulePoints] = useState("");

  /* ---------------- GET QUESTIONS ---------------- */
  const fetchQuestions = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/question`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setQuestions(res.data || []);
    } catch (err) {
      console.error("Fetch question error", err);
    }
  };

  /* ---------------- GET RULES ---------------- */
  const fetchRules = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/leadscore`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRules(res.data || []);
    } catch (err) {
      console.error("Fetch rule error", err);
    }
  };

  /* ---------------- INITIAL LOAD ---------------- */
  useEffect(() => {
    fetchQuestions();
    fetchRules();
  }, []);

  /* ---------------- ADD QUESTION ---------------- */
  const handleAddQuestion = async () => {
    try {
      await axios.post(
        `${BASE_URL}/question`,
        { question },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setQuestion("");
      setShowQuestionModal(false);
      fetchQuestions(); // 🔥 refresh list
    } catch (err) {
      console.error("Add question error", err);
    }
  };

  /* ---------------- ADD RULE ---------------- */
  const handleAddRule = async () => {
    try {
      await axios.post(
        `${BASE_URL}/leadscore`,
        { title: ruleTitle, points: Number(rulePoints) },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setRuleTitle("");
      setRulePoints("");
      setShowRuleModal(false);
      fetchRules(); // 🔥 refresh list
    } catch (err) {
      console.error("Add rule error", err);
    }
  };

  return (
    <div>
      {/* ================= QUESTIONS ================= */}
      <div className="bg-[#FFFFFF] rounded-2xl col-span-12 p-6">
        <div className="mb-6">
          <p className="font-inter text-[#0A0A0A]">
            Custom Qualification Questions
          </p>
          <p className="font-inter text-[#717182] mt-2">
            Define what information to gather from leads
          </p>
        </div>

        <div className="space-y-4">
          {questions.map((q, i) => (
            <InputField
              key={i}
              readOnly
              inputClass="rounded-lg"
              label={`Question ${i + 1}`}
              placeholder={q.question}
            />
          ))}
        </div>

        <button
          onClick={() => setShowQuestionModal(true)}
          className="border border-black/10 w-full text-[#0A0A0A] text-center py-2 rounded-lg mt-4 font-inter"
        >
          + Add Question
        </button>
      </div>

      {/* ================= RULES ================= */}
      <div className="bg-[#FFFFFF] rounded-2xl col-span-12 p-6 mt-8">
        <div className="mb-6">
          <p className="font-inter text-[#0A0A0A]">Lead Scoring Rules</p>
          <p className="font-inter text-[#717182] mt-2">
            Customize how leads are scored based on responses
          </p>
        </div>

        <div className="space-y-4">
          {rules.map((r, i) => (
            <div
              key={i}
              className="flex justify-between items-center py-3 px-3 rounded-lg border border-black/10"
            >
              <p className="font-inter text-[#0A0A0A]">{r.title}</p>
              <span className="font-inter text-sm p-1 text-[#008236] bg-[#DCFCE7] rounded-lg">
                +{r.points} points
              </span>
            </div>
          ))}
        </div>

        <button
          onClick={() => setShowRuleModal(true)}
          className="border border-black/10 text-[#0A0A0A] w-full text-center py-2 rounded-lg mt-4 font-inter"
        >
          + Add Rule
        </button>
      </div>

      {/* ================= QUESTION MODAL ================= */}
      {showQuestionModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl px-5 py-10 w-[480px]">
            <InputField
              label="Question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Ex.What is your name?"
              inputClass="rounded-lg"
            />

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowQuestionModal(false)}
                className="px-4 py-2 border border-black/10 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleAddQuestion}
                className="px-4 py-2 bg-[#900616] text-white rounded-lg"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= RULE MODAL ================= */}
      {showRuleModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-[420px]">
            <InputField
              label="Rule Title"
              value={ruleTitle}
              onChange={(e) => setRuleTitle(e.target.value)}
              placeholder="Ex.Mentions pricing"
              inputClass="rounded-lg"
            />

            <InputField
              label="Points"
              type="number"
              value={rulePoints}
              onChange={(e) => setRulePoints(e.target.value)}
              placeholder="25"
              inputClass="rounded-lg mt-3 "
            />

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowRuleModal(false)}
                className="px-4 py-2 border border-black/10 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleAddRule}
                className="px-4 py-2 bg-[#900616] text-white rounded-lg"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Qualification;
