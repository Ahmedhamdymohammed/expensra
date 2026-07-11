
const Section = ({className, children, ...props}) => {
  return (
    <section className={`m-0 p-5 ${className}`} {...props} >
        {children}
    </section>
  )
}

export default Section