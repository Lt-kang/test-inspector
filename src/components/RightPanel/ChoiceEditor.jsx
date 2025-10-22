export default function ChoiceEditor({ content, onChange }) {
    return (
        <div className="prose max-w-none">
            {content && Object.entries(content).map(([key, value]) => (
                key.trim() === "" ? null : (
                <div key={key} style={{ marginBottom: "1rem" }}>
                    <label className="font-semibold mr-2">{key}</label>
                    <TextEditor
                        text={value ?? ""}
                        onChange={e => {
                            const newValue = e.target.value;
                            // produce a new object with the updated value for key
                            const updatedContent = { ...content, [key]: newValue };
                            onChange?.(updatedContent);
                        }}
                        placeholder={`Enter value for ${key}`}
                    />
                </div>
                )
            ))}
        </div>
    )
}



function TextEditor({ text, onChange }) {
    return (
        <textarea
        value={text}
        onChange={onChange}
        rows={2}
        className="p-3 border rounded font-mono text-sm outline-none focus:ring-2 w-full min-h-[10px]"
        // spellCheck={false}
      />
    )
}