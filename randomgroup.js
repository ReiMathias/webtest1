export default function RandomGroupGenerator() {
  const { useState } = React;

  const [names, setNames] = useState('');
  const [groupCount, setGroupCount] = useState(2);
  const [groups, setGroups] = useState([]);

  const generateGroups = () => {
    const people = names
      .split('\n')
      .map((n) => n.trim())
      .filter(Boolean);

    if (!people.length) return;

    const shuffled = [...people];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    const result = Array.from({ length: groupCount }, () => []);

    shuffled.forEach((person, index) => {
      result[index % groupCount].push(person);
    });

    setGroups(result);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-900">Random Group Generator</h1>
          <p className="text-slate-600 mt-2">Create fair, random teams in seconds</p>
        </div>

        <div className="bg-white rounded-3xl shadow-lg p-6 mb-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium mb-2">Names (one per line)</label>
              <textarea
                value={names}
                onChange={(e) => setNames(e.target.value)}
                placeholder="Alice&#10;Bob&#10;Charlie&#10;David"
                className="w-full h-64 p-4 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Number of Groups</label>
                <input
                  type="number"
                  min="1"
                  value={groupCount}
                  onChange={(e) => setGroupCount(Number(e.target.value))}
                  className="w-full p-3 border rounded-2xl"
                />
              </div>

              <button
                onClick={generateGroups}
                className="bg-blue-600 text-white py-3 px-6 rounded-2xl font-semibold hover:bg-blue-700 transition"
              >
                Generate Groups
              </button>
            </div>
          </div>
        </div>

        {groups.length > 0 && (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {groups.map((group, index) => (
              <div
                key={index}
                className="bg-white rounded-3xl shadow-md p-5"
              >
                <h2 className="text-xl font-bold mb-3 text-slate-800">
                  Group {index + 1}
                </h2>
                <ul className="space-y-2">
                  {group.map((person) => (
                    <li
                      key={person}
                      className="bg-slate-100 rounded-xl px-3 py-2"
                    >
                      {person}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
