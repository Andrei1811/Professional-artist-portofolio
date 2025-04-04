"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function Portfolio() {
    const [selectedCategory, setSelectedCategory] = useState("Overview")


    const categories = ["Overview", "lifestyle", "travel", "couples", "sport"]

    const works = [
        {
            id: 1,
            title: "",
            category: "lifestyle",
            image: "/DSC_4244.jpg",
            year: "",

        },
        {
            id: 2,
            title: "",
            category: "travel",
            image: "/IRI_9328.jpg",
            year: "",
        },
        {
            id: 3,
            title: "",
            category: "couples",
            image: "/IRI_4926-2.jpg",
            year: "",
        },
        {
            id: 4,
            title: "",
            category: "sport",
            image: "/DSC_3460.jpg",
            year: "",
        },
        {
            id: 5,
            title: "",
            category: "lifestyle",
            image: "JUL_5935.jpg",
            year: "",
        },
        {
            id: 6,
            title: "",
            category: "travel",
            image: "/IRI_9132.jpg",
            year: "",
        },

        {
            id: 7,
            title: "",
            category: "couples",
            image: "/DSC_2452.jpg",
            year: "",
        },

        {
            id: 8,
            title: "",
            category: "sport",
            image: "/DSC_7126.jpg",
            year: "",
        },
    ]



    const filteredWorks = works.filter((work) =>
        selectedCategory === "Overview" ? true : work.category === selectedCategory
    )

    return (
        <section className="bg-black py-20">
            <div className="container mx-auto px-4">
                {/* Butoane categorii */}
                <div className="mb-12 flex flex-wrap justify-center gap-4">
                    {categories.map((category) => (
                        <Button
                            key={category}
                            variant={selectedCategory === category ? "default" : "ghost"}
                            onClick={() => setSelectedCategory(category)}
                            className="text-sm capitalize"
                        >
                            {category}
                        </Button>
                    ))}
                </div>

                {/* Galerie principala */}
                <motion.div layout className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                    <AnimatePresence>
                        {filteredWorks.map((work) => (
                            <motion.div
                                key={work.id}
                                layout
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                <Card className="overflow-hidden bg-zinc-900 border-none">
                                    <CardContent className="p-0">
                                        <div className="group relative">
                                            <div className="aspect-[2/3] overflow-hidden">
                                                <img
                                                    src={work.image}
                                                    alt={work.title}
                                                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                />
                                            </div>
                                            <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 to-transparent p-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                                <div className="w-full">
                                                    <h3 className="text-xl font-semibold text-white">{work.title}</h3>
                                                    <p className="mt-2 text-sm text-gray-300">{work.year}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

               
            </div>
        </section>
    )
}
