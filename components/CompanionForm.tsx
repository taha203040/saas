"use client";
import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { subjects } from "@/constants";
import { Textarea } from "./ui/textarea";
const formSchema = z.object({
  name: z.string().min(2, {
    message: "name is required ",
  }),

  topic: z.string().min(2, {
    message: "topic is required ",
  }),
  subject: z.string().min(2, {
    message: "message is required ",
  }),
  voice: z.string().min(2, {
    message: "voice is required ",
  }),
  style: z.string().min(2, {
    message: "style is required ",
  }),
  duration: z.coerce.number().min(2, {
    message: "duration is required ",
  }),
});
const CompanionForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      topic: "",
      subject: "",
      voice: "",
      style: "",
      duration: 10,
    },
  });
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Companion name</FormLabel>
                <FormControl>
                  <Input className="input" placeholder="Enter your companion name" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="subject"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Subject</FormLabel>
                <FormControl>
                  <Select 
                  onValueChange={field.onChange}
                  value={field.value}
                  defaultValue={field.value}>
                    <SelectTrigger className="w-[180px] input">
                      <SelectValue placeholder="Enter a subject" />
                    </SelectTrigger>
                    <SelectContent>
                      {subjects.map((subject) => (
                        <SelectItem value={`${subject}`}>{subject}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="topic"
            render={({ field }) => (
              <FormItem>
                <FormLabel>What should this companion teach?</FormLabel>
                <FormControl>
                  <Textarea
                  className="input"
                    placeholder="Enter the topic you want to learn - ex: Derivatives"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="voice"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Voice</FormLabel>
                <FormControl>
                  <Select 
                  onValueChange={field.onChange}
                  value={field.value}
                  defaultValue={field.value}>
                    <SelectTrigger className="w-[180px] input">
                      <SelectValue placeholder="Voice" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="style"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Style</FormLabel>
                <FormControl>
                  <Select 
                  onValueChange={field.onChange}
                  value={field.value}
                  defaultValue={field.value}>
                    <SelectTrigger className="w-[180px] input">
                      <SelectValue placeholder="Style" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Formal</SelectItem>
                      <SelectItem value="dark">casual</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="duration"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Duration</FormLabel>
                <FormControl>
                  <Input
                    className="input"
                    type="number"
                    placeholder="Duration"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="btn-primary w-full" type="submit">
            Build Companion
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default CompanionForm;
