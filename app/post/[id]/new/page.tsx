export default function NewPostPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">📝 Yangi Post Qo‘shish</h1>
      <form>
        <input
          type="text"
          placeholder="Sarlavha (UZ)"
          className="block w-full mb-4 p-2 border rounded"
        />
        <textarea
          placeholder="Kontent (UZ)"
          className="block w-full mb-4 p-2 border rounded"
          rows={5}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Saqlash
        </button>
      </form>
    </div>
  );
}
