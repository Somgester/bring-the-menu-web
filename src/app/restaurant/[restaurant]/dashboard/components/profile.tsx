"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface ProfileData {
  name: string
  location: string
  openingHours: string
  description: string
  phone: string
  email: string
  address: {
    street: string
    city: string
    state: string
    zipCode: string
    country: string
  }
  socialMedia: {
    facebook: string
    twitter: string
    instagram: string
  }
}

export function Profile() {
  const [profile, setProfile] = useState<ProfileData | null>(null)
  const [isEditing, setIsEditing] = useState(!profile)

  const [formData, setFormData] = useState<ProfileData>({
    name: profile?.name ?? "",
    location: profile?.location ?? "",
    openingHours: profile?.openingHours ?? "",
    description: profile?.description ?? "",
    phone: profile?.phone ?? "",
    email: profile?.email ?? "",
    address: profile?.address ?? {
      street: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
    },
    socialMedia: profile?.socialMedia || {
      facebook: "",
      twitter: "",
      instagram: "",
    },
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prevData) => {
      if (name.includes(".") ) {
        const [section, field] = name.split(".")
        return {
          ...prevData,
          [section]: {
            ...prevData[section as keyof ProfileData] as Record<string, string>,
            [field]: value,
          },
        }
      }
      return { ...prevData, [name]: value }
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setProfile(formData)
    setIsEditing(false)
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Restaurant Profile</CardTitle>
      </CardHeader>
      <CardContent>
        {(() => {
          if (isEditing) {
            return (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">Restaurant Name</Label>
                  <Input id="name" name="name" value={formData.name} onChange={handleInputChange} />
                </div>
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" name="location" value={formData.location} onChange={handleInputChange} />
                </div>
                <div>
                  <Label htmlFor="openingHours">Opening Hours</Label>
                  <Input id="openingHours" name="openingHours" value={formData.openingHours} onChange={handleInputChange} />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" name="description" value={formData.description} onChange={handleInputChange} />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" name="phone" value={formData.phone} onChange={handleInputChange} />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" value={formData.email} onChange={handleInputChange} />
                </div>
                <div className="space-y-2">
                  <Label>Address</Label>
                  <Input
                    name="address.street"
                    placeholder="Street"
                    value={formData.address.street}
                    onChange={handleInputChange}
                  />
                  <Input
                    name="address.city"
                    placeholder="City"
                    value={formData.address.city}
                    onChange={handleInputChange}
                  />
                  <Input
                    name="address.state"
                    placeholder="State"
                    value={formData.address.state}
                    onChange={handleInputChange}
                  />
                  <Input
                    name="address.zipCode"
                    placeholder="Zip Code"
                    value={formData.address.zipCode}
                    onChange={handleInputChange}
                  />
                  <Input
                    name="address.country"
                    placeholder="Country"
                    value={formData.address.country}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Social Media</Label>
                  <Input
                    name="socialMedia.facebook"
                    placeholder="Facebook URL"
                    value={formData.socialMedia.facebook}
                    onChange={handleInputChange}
                  />
                  <Input
                    name="socialMedia.twitter"
                    placeholder="Twitter URL"
                    value={formData.socialMedia.twitter}
                    onChange={handleInputChange}
                  />
                  <Input
                    name="socialMedia.instagram"
                    placeholder="Instagram URL"
                    value={formData.socialMedia.instagram}
                    onChange={handleInputChange}
                  />
                </div>
              </form>
            )
          } else if (profile) {
            return (
              <div className="space-y-4">
                <p>
                  <strong>Name:</strong> {profile.name}
                </p>
                <p>
                  <strong>Location:</strong> {profile.location}
                </p>
                <p>
                  <strong>Opening Hours:</strong> {profile.openingHours}
                </p>
                <p>
                  <strong>Description:</strong> {profile.description}
                </p>
                <p>
                  <strong>Phone:</strong> {profile.phone}
                </p>
                <p>
                  <strong>Email:</strong> {profile.email}
                </p>
                <div>
                  <strong>Address:</strong>
                  <p>{profile.address.street}</p>
                  <p>
                    {profile.address.city}, {profile.address.state} {profile.address.zipCode}
                  </p>
                  <p>{profile.address.country}</p>
                </div>
                <div>
                  <strong>Social Media:</strong>
                  <p>Facebook: {profile.socialMedia.facebook}</p>
                  <p>Twitter: {profile.socialMedia.twitter}</p>
                  <p>Instagram: {profile.socialMedia.instagram}</p>
                </div>
              </div>
            )
          } else {
            return <p>No profile information available. Click Edit to add your restaurant details.</p>
          }
        })()}
      </CardContent>
      <CardFooter>
        {isEditing ? (
          <Button type="submit" onClick={handleSubmit}>
            Save Profile
          </Button>
        ) : (
          <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
        )}
      </CardFooter>
    </Card>
  )
}

