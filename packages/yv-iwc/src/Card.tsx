export type CardProps = {
  title: string
  children: React.ReactNode
}

export const Card: React.FC<CardProps> = ({ title, children }) => (
  <div style={{ border: '1px solid #ccc', padding: 16, borderRadius: 8 }}>
    <h3>{title}</h3>
    <div>{children}</div>
  </div>
)
