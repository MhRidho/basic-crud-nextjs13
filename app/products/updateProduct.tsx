'use client'
import { SyntheticEvent, useState } from "react"
import { useRouter } from "next/navigation"

type Product = {
  id: number;
  title: string;
  price: number;
}

const UpdateProduct = (product: Product) => {
  const [title, setTitle] = useState(product.title)
  const [price, setPrice] = useState(product.price)
  const [modal, setModal] = useState(false)
  const [isMutating, setIsMutating] = useState(false)
  const router = useRouter()

  const handleChange = () => {
    setModal(!modal)
  }

  const handleUpdate = async (e:SyntheticEvent) => {
    e.preventDefault();
    setIsMutating(true)
    await fetch(`http://localhost:5000/products/${product.id}`, {
      method: 'PATCH',  
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify({
        title: title,
        price: price,
      })
    })
    setIsMutating(false)
    router.refresh();
    setModal(false)
  }

  return (
    <div>
      <button className="btn btn-info btn-sm" onClick={handleChange}>Edit</button>
      <input type="checkbox" checked={modal} onChange={handleChange} className="modal-toggle"/>
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Edit {product.title}</h3>
          <form onSubmit={handleUpdate}>
            <div className="form-control">
              <label className="label font-bold">Title</label>
              <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" className="input w-full input-bordered" placeholder="Product name"/>
            </div>
            <div className="form-control">
              <label className="label font-bold">Price</label>
              <input value={price} onChange={(e) => setPrice(Number(e.target.value))} type="text" className="input w-full input-bordered" placeholder="Price"/>
            </div>
            <div className="modal-action">
              <button type="button" className="btn" onClick={handleChange}>Close</button>
              {!isMutating? (
                <button type="submit" className="btn btn-primary">Update</button>
              ):(
                <button type="button" className="btn loading">Updating...</button>
              )}                
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default UpdateProduct