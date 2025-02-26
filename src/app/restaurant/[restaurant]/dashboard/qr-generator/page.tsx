"use client"

import type React from "react"

import { useState, useRef } from "react"
import { QRCodeSVG } from "qrcode.react"
import { Download } from "lucide-react"
import FileSaver from "file-saver"
import html2canvas from "html2canvas"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function QRGenerator() {
  const [startNumber, setStartNumber] = useState("")
  const [endNumber, setEndNumber] = useState("")
  const [baseUrl, setBaseUrl] = useState("https://example.com/table/")
  const [qrCodes, setQrCodes] = useState<number[]>([])
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  const generateQRCodes = (e: React.FormEvent) => {
    e.preventDefault()
    const start = Number.parseInt(startNumber)
    const end = Number.parseInt(endNumber)

    if (start > end) {
      alert("Start number must be less than end number")
      return
    }

    const codes = Array.from({ length: end - start + 1 }, (_, i) => start + i)
    setQrCodes(codes)
    // Reset refs array to match new codes length
    cardRefs.current = Array(codes.length).fill(null)
  }

  const downloadQR = async (tableNumber: number, index: number) => {
    const cardElement = cardRefs.current[index]
    if (!cardElement) return

    try {
      const canvas = await html2canvas(cardElement, {
        background: undefined,
      })

      canvas.toBlob((blob) => {
        if (blob) {
          FileSaver.saveAs(blob, `table-${tableNumber}-qr.png`)
        }
      })
    } catch (error) {
      console.error("Error generating image:", error)
    }
  }

  const downloadAllQRs = async () => {
    for (let i = 0; i < qrCodes.length; i++) {
      await downloadQR(qrCodes[i], i)
      // Small delay to prevent browser from freezing
      await new Promise((resolve) => setTimeout(resolve, 300))
    }
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <Card className="max-w-md mx-auto mb-8">
        <CardHeader>
          <CardTitle>Table QR Code Generator</CardTitle>
          <CardDescription>Generate QR codes for multiple table numbers</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={generateQRCodes} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="startNumber">Start Table Number</Label>
              <Input
                id="startNumber"
                type="number"
                value={startNumber}
                onChange={(e) => setStartNumber(e.target.value)}
                placeholder="Enter start number"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="endNumber">End Table Number</Label>
              <Input
                id="endNumber"
                type="number"
                value={endNumber}
                onChange={(e) => setEndNumber(e.target.value)}
                placeholder="Enter end number"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="baseUrl">Base URL</Label>
              <Input
                id="baseUrl"
                type="text"
                value={baseUrl}
                onChange={(e) => setBaseUrl(e.target.value)}
                placeholder="https://example.com/table/"
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Generate QR Codes
            </Button>
          </form>
        </CardContent>
      </Card>

      {qrCodes.length > 0 && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Generated QR Codes</h2>
            <Button onClick={downloadAllQRs} variant="outline">
              Download All
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {qrCodes.map((number, index) => (
              <Card key={number} className="p-4">
                <div
                  ref={(el) => {
                    cardRefs.current[index] = el
                  }}
                  className="flex flex-col items-center space-y-4 bg-white p-4 rounded-lg"
                >
                  <h3 className="text-lg font-semibold text-center">Scan for Menu</h3>
                  <QRCodeSVG id={`qr-${number}`} value={`${baseUrl}${number}`} size={200} includeMargin />
                  <div className="w-full pt-2 border-t border-gray-200">
                    <div className="flex flex-col items-center w-full mt-2 text-center">
                      <span className="text-xl font-bold">Table {number}</span>
                      <span className="text-[10px] text-gray-400 mt-1">Powered by Bringing the Menu</span>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end mt-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => downloadQR(number, index)}
                    className="flex items-center gap-1"
                  >
                    <Download className="h-4 w-4" />
                    <span>Download</span>
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

