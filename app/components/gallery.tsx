"use client"

import { motion } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { useInView } from "framer-motion"

// Lista completă a imaginilor
const imageList = [
    "/DSC_0295.jpg",
    "/IRI_1259-2.jpg",
    "/IRI_3165.jpg",
    "/IRI_0625.jpg",
    "/DSC_4244.jpg",
    "/IRI_9328.jpg",
    "/IRI_4926-2.jpg",
    "/DSC_3460.jpg",
    "/JUL_5935.jpg",
    "/IRI_9132.jpg",
    "/DSC_2452.jpg",
    "/DSC_7126.jpg"
]

export default function Gallery() {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true })
    const [randomImages, setRandomImages] = useState([])

    // Generează obiecte imagine cu metadate
    const formattedImages = imageList.map(img => ({
        src: img,
        alt: img.replace(/\.[^/.]+$/, "") // Elimină extensia
            .replace(/^\/|\/$/g, "")   // Elimină slash-urile
            .replace(/[-_]/g, " ")     // Înlocuiește - și _ cu spații
    }))

    // Funcția pentru schimbarea imaginilor
    const shuffleImages = () => {
        const shuffled = [...formattedImages].sort(() => 0.5 - Math.random())
        setRandomImages(shuffled.slice(0, 4))
    }

    useEffect(() => {
        // Inițializare la montare
        shuffleImages()

        // Setează intervalul pentru schimbare automată
        const interval = setInterval(shuffleImages, 5000) // 5000ms = 5 secunde

        // Cleanup la demontare
        return () => clearInterval(interval)
    }, [])

    return (
        <section className="relative py-20">
            <div ref={ref} className="container mx-auto px-4">
                <motion.h2
                    className="mb-12 text-center text-3xl font-bold tracking-tighter sm:text-4xl"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    Featured Works
                </motion.h2>
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                    {randomImages.map((image, index) => (
                        <motion.div
                            key={`${image.src}-${index}`} // Cheie unică pentru fiecare ciclu
                            className="group relative overflow-hidden rounded-lg"
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                            transition={{ duration: 0.8, delay: index * 0.2 }}
                        >
                            <div className="aspect-[2/3] overflow-hidden">
                                <img
                                    src={image.src}
                                    alt={image.alt}
                                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                            </div>
                            <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 to-transparent p-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}