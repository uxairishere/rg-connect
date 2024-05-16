'use client';
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from '@/components/ui/input';
import { Button } from "@/components/ui/button";
import { formSchema } from "@/lib/constants";
import { CheckCircleIcon, ExclamationCircleIcon, PaperAirplaneIcon } from '@heroicons/react/24/outline';
import { zodResolver } from "@hookform/resolvers/zod";
import { Ellipsis } from "lucide-react";
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';


interface FormData {
  profileId: string;
  username: string;
  password: string;
  loginCode: string;
}

const Home: React.FC = () => {
  const router = useRouter();
  const [alertStatus, setAlertStatus] = useState<string>('');
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      profileId: "",
      username: "",
      password: "",
      loginCode: "",
    }
  })

  const isLoading = form.formState.isSubmitting;

  useEffect(() => {
    setTimeout(() => {
      setAlertStatus('');
    }, 6000)
  }, [alertStatus])

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const payload: FormData = {
        profileId: values.profileId,
        username: values.username,
        password: values.password,
        loginCode: values.loginCode
      }


      const response = await fetch('/api/integrate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const res = await response.json()
      if (res?.error) return setAlertStatus("error")

      setAlertStatus("success")
      form.reset();
    } catch (error: any) {
      console.error(error)
      setAlertStatus("error")

    } finally {
      router.refresh();
    }
  }

  const AlertMessage = () => {
    if (!alertStatus) return null;
    if (alertStatus === 'success')
      return <div className='flex mt-5 justify-start items-start gap-1 text-green-500 w-[80%] text-sm'>
        <CheckCircleIcon className='w-6 h-6' />
        <h1 className='inline-block'>Your account has been integrated successfully!</h1>
      </div>

    return <div className='flex mt-5 justify-start items-start gap-1 text-red-500 w-[80%] text-sm'>
      <ExclamationCircleIcon className='w-6 h-6' />
      <h1 className='inline-block'>There has been an error while integrating your account. Please try again.</h1>
    </div>
  }

  return (
    <div id='contact-section' className="py-10 px-6 w-full lg:w-[45%] mx-auto">
      <div className="mb-5">
        <h1 className="text-5xl font-extrabold text-green-500/75 mb-3">Integrate</h1>
        <h2 className="text-3xl font-semibold ">Please provide your credentials</h2>
      </div>
      <div className='flex flex-col md:flex-row justify-center items-center gap-x-10'>
        {/* <Image width={510} height={340} src={mapImage.src} alt="map..." className='w-[60%]' /> */}

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full"
          >
            <FormField
              name="profileId"
              render={({ field }) => (
                <FormItem className="mb-4 relative">
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      label='Profile ID'
                      htmlFor='profileId'
                      type="text"
                      id="profileId"
                      {...field}
                    />
                  </FormControl>
                  {form.formState.errors.profileId && <span className="absolute rounded-sm top-1/2 transform -translate-y-1/3 border border-red-500/25 p-1 right-1  text-red-500/70 text-xs">{form.formState.errors.profileId.message}</span>}
                </FormItem>
              )}
            />
            <FormField
              name="loginCode"
              render={({ field }) => (
                <FormItem className="mb-4 relative">
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      label='Login Code'
                      htmlFor='loginCode'
                      id="loginCode"
                      {...field}
                    />
                  </FormControl>
                  {form.formState.errors.loginCode && <span className="absolute rounded-sm top-1/2 transform -translate-y-1/3 border border-red-500/25 p-1 right-1  text-red-500/70 text-xs">{form.formState.errors.loginCode.message}</span>}
                </FormItem>
              )}
            />

            <FormField
              name="username"
              render={({ field }) => (
                <FormItem className="mb-4 relative">
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      label='Username'
                      htmlFor='username'
                      type="text"
                      id="username"
                      {...field}
                    />
                  </FormControl>
                  {form.formState.errors.username && <span className="absolute rounded-sm top-1/2 transform -translate-y-1/3 border border-red-500/25 p-1 right-1  text-red-500/70 text-xs">{form.formState.errors.username.message}</span>}
                </FormItem>
              )}
            />

            <FormField
              name="password"
              render={({ field }) => (
                <FormItem className="mb-4 relative">
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      label='Password'
                      htmlFor='password'
                      type="text"
                      id="password"
                      {...field}
                    />
                  </FormControl>
                  {form.formState.errors.password && <span className="absolute rounded-sm top-1/2 transform -translate-y-1/3 border border-red-500/25 p-1 right-1  text-red-500/70 text-xs">{form.formState.errors.password.message}</span>}
                </FormItem>
              )}
            />

            <Button
              disabled={isLoading}
              type="submit"
              className="group w-fit bg-green-500 hover:bg-green-700 p-3 rounded-full transition duration-300"
            >
              {isLoading ?
                <Ellipsis className="w-4 h-4 animate-pulse"  /> : (
                  <div className="flex justify-center items-center gap-1">
                    Submit
                    <PaperAirplaneIcon className='w-5 h-5 text-white' />
                  </div>
                )
              }
            </Button>
            <AlertMessage />
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Home;