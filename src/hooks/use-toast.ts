"use client"

// Inspired by react-hot-toast library
import * as React from "react"

import type {
  ToastActionElement,
  ToastProps,
} from "@/components/ui/toast"

// const TOAST_LIMIT = 1
// const TOAST_REMOVE_DELAY = 1000000

// type ToasterToast = ToastProps & {
//   id: string
//   title?: React.ReactNode
//   description?: React.ReactNode
//   action?: ToastActionElement
// }

// type ActionTypes = {
//   ADD_TOAST: "ADD_TOAST",
//   UPDATE_TOAST: "UPDATE_TOAST",
//   DISMISS_TOAST: "DISMISS_TOAST",
//   REMOVE_TOAST: "REMOVE_TOAST",
// }

// const count = 0