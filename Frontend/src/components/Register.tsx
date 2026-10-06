import { useState } from "react";
import { useToast } from "@/components/ui/use-toast"; // adjust import path if needed
import { registerTeam } from "@/services/api";


const Register = () => {
  const { toast } = useToast();

  const [teamName, setTeamName] = useState("");
  const [teamMembers, setTeamMembers] = useState(2);
  const [members, setMembers] = useState([
    { name: "", regNo: "", contact: "", department: "", Email: "" },
    { name: "", regNo: "", contact: "", department: "", Email: "" },
  ]);

  const handleTeamMemberChange = (num: number) => {
    setTeamMembers(num);
    const newMembers = Array(num)
      .fill(null)
      .map(
        (_, i) =>
          members[i] || {
            name: "",
            regNo: "",
            contact: "",
            department: "",
            Email: "",
          }
      );
    setMembers(newMembers);
  };

  const handleMemberInput = (index: number, field: string, value: string) => {
    const updated = [...members];
    (updated[index] as any)[field] = value;
    setMembers(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = { teamName, teamMembers, members };

    try {
      await registerTeam(formData);

      toast({
        title: "🎉 Registration Successful!",
        description: "Your team has been registered successfully.",
      });

      // reset form after success
      setTeamName("");
      setTeamMembers(2);
      setMembers([
        { name: "", regNo: "", contact: "", department: "", Email: "" },
        { name: "", regNo: "", contact: "", department: "", Email: "" },
      ]);
    } catch (err) {
      console.error(err);
      toast({
        title: "❌ Registration Failed",
        description: "Please check your connection or try again later.",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-200 via-white to-blue-200 text-gray-800 px-4 py-24 overflow-x-hidden">
      <div className="backdrop-blur-xl bg-white/70 p-10 rounded-3xl shadow-2xl w-full max-w-3xl border border-cyan-300/50">
        <h1 className="text-4xl font-bold text-center mb-10 bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent drop-shadow-sm tracking-wide leading-[1.3]">
          Registration Form
        </h1>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Team Info */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700">
                Team Name
              </label>
              <input
                type="text"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                required
                placeholder="Enter team name"
                className="w-full p-3 rounded-xl border border-cyan-300 focus:border-cyan-500 outline-none focus:ring-4 focus:ring-cyan-100 transition bg-white/60 backdrop-blur-sm"
              />
            </div>

            {/* Team Members Dropdown */}
            <div className="relative">
              <label className="block text-sm font-semibold mb-2 text-gray-700">
                Number of Members
              </label>
              <div className="relative group">
                <select
                  value={teamMembers}
                  onChange={(e) =>
                    handleTeamMemberChange(Number(e.target.value))
                  }
                  className="appearance-none w-full p-3 rounded-xl border border-cyan-400 bg-gradient-to-r from-cyan-50/80 to-blue-50/70 
                             focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100 outline-none transition-all duration-300 
                             shadow-md backdrop-blur-lg cursor-pointer text-gray-700 font-medium pr-12 hover:shadow-lg hover:border-cyan-500"
                >
                  {[2, 3, 4].map((num) => (
                    <option key={num} value={num}>
                      {num} Members
                    </option>
                  ))}
                </select>
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-cyan-500 group-hover:text-cyan-600 transition-colors duration-300 pointer-events-none">
                  ▼
                </div>
              </div>
            </div>
          </div>

          {/* Dynamic Member Forms */}
          <div className="space-y-10">
            {members.slice(0, teamMembers).map((member, index) => (
              <div
                key={index}
                className="p-6 rounded-2xl bg-gradient-to-r from-cyan-50 to-blue-50 border border-cyan-200 shadow-md hover:shadow-xl transition-all duration-300"
              >
                <h2 className="text-xl font-semibold mb-5 bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                  Member {index + 1}
                </h2>

                <div className="grid md:grid-cols-2 gap-5">
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={member.name}
                    onChange={(e) =>
                      handleMemberInput(index, "name", e.target.value)
                    }
                    required
                    className="p-3 rounded-xl border border-cyan-300 focus:border-cyan-500 outline-none focus:ring-4 focus:ring-cyan-100 transition bg-white/60 backdrop-blur-sm"
                  />
                  <input
                    type="text"
                    placeholder="Registration Number"
                    value={member.regNo}
                    onChange={(e) =>
                      handleMemberInput(index, "regNo", e.target.value)
                    }
                    required
                    className="p-3 rounded-xl border border-cyan-300 focus:border-cyan-500 outline-none focus:ring-4 focus:ring-cyan-100 transition bg-white/60 backdrop-blur-sm"
                  />
                  <input
                    type="tel"
                    placeholder="Contact Number"
                    value={member.contact}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (/^\d{0,10}$/.test(value)) {
                        handleMemberInput(index, "contact", value);
                      }
                    }}
                    maxLength={10}
                    required
                    className="p-3 rounded-xl border border-cyan-300 focus:border-cyan-500 outline-none focus:ring-4 focus:ring-cyan-100 transition bg-white/60 backdrop-blur-sm"
                  />
                  <input
                    type="text"
                    placeholder="Department (e.g. B.Tech / BCA)"
                    value={member.department}
                    onChange={(e) =>
                      handleMemberInput(index, "department", e.target.value)
                    }
                    required
                    className="p-3 rounded-xl border border-cyan-300 focus:border-cyan-500 outline-none focus:ring-4 focus:ring-cyan-100 transition bg-white/60 backdrop-blur-sm"
                  />
                  <input
                    type="email"
                    placeholder="Email address"
                    value={member.Email}
                    onChange={(e) =>
                      handleMemberInput(index, "Email", e.target.value)
                    }
                    required
                    className="p-3 rounded-xl border border-cyan-300 focus:border-cyan-500 outline-none focus:ring-4 focus:ring-cyan-100 transition bg-white/60 backdrop-blur-sm md:col-span-2"
                  />
                </div>
              </div>
            ))}
          </div>

          <button
            type="submit"
            className="w-full py-4 text-lg font-semibold rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:from-cyan-400 hover:to-blue-400 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
          >
            🚀 Submit Registration
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
