"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { motion } from "framer-motion"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"

const formSchema = z.object({
    name: z.string().min(2, {
        message: "Name must be at least 2 characters.",
    }),
    email: z.string().email({
        message: "Please enter a valid email address.",
    }),
    message: z.string().min(10, {
        message: "Message must be at least 10 characters.",
    }),
})

export default function Contact() {
    const [isSubmitting, setIsSubmitting] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            message: "",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsSubmitting(true)

        try {
            const response = await fetch("/api/submit", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
            })

            if (!response.ok) throw new Error()

            toast({ title: "Mesaj trimis cu succes!" })
            form.reset()
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Eroare",
                description: "Mesajul nu a putut fi trimis",
            })
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <section className="relative overflow-hidden bg-zinc-900 py-20">
            <div className="container relative z-10 mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="mx-auto max-w-2xl text-center"
                >
                    <h2 className="mb-4 text-3xl font-bold tracking-tighter text-white sm:text-4xl">Get in Touch</h2>
                    <p className="mb-8 text-gray-300">
                        Interested in collaborating or commissioning a piece? Let's create something amazing together.
                    </p>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="mx-auto max-w-md"
                >
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-gray-300">Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Your name"
                                                {...field}
                                                className="bg-zinc-800 text-white border-zinc-700 placeholder:text-gray-400 focus:border-blue-500"
                                            />
                                        </FormControl>
                                        <FormMessage className="text-red-400" />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-gray-300">Email</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="your@email.com"
                                                {...field}
                                                className="bg-zinc-800 text-white border-zinc-700 placeholder:text-gray-400 focus:border-blue-500"
                                            />
                                        </FormControl>
                                        <FormMessage className="text-red-400" />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="message"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-gray-300">Message</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Tell me about your project..."
                                                className="min-h-[120px] bg-zinc-800 text-white border-zinc-700 placeholder:text-gray-400 focus:border-blue-500"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage className="text-red-400" />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" disabled={isSubmitting} className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                                {isSubmitting ? "Sending..." : "Send Message"}
                            </Button>
                        </form>
                    </Form>
                </motion.div>
            </div>
            <div className="absolute inset-0 z-0 opacity-20">
                <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    {Array.from({ length: 50 }).map((_, i) => (
                        <line key={i} x1={i * 2} y1="0" x2={i * 2} y2="100" stroke="white" strokeWidth="0.1" />
                    ))}
                </svg>
            </div>
        </section>
    )
}

