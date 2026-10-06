export function Emphasis({ text }: { text: string }) {
  const chunks = text.split(/(\{em\}[\s\S]*?\{\/em\})/g)
  return (
    <>
      {chunks.map((chunk, index) => {
        const marked = chunk.match(/^\{em\}([\s\S]*)\{\/em\}$/)
        if (!marked) return <span key={index}>{chunk}</span>
        return (
          <span key={index} className="text-primary">
            {marked[1]}
          </span>
        )
      })}
    </>
  )
}
