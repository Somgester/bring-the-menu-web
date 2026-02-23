"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Loader2 } from "lucide-react"
import { useAuth } from "@/hooks/useAuth"
import {
  getRestaurantProfile,
  saveRestaurantProfile,
  RestaurantProfile as DBRestaurantProfile,
} from "@/lib/firebase/firestore"
import { toast } from "sonner"

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
  const { restaurant } = useAuth()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState<ProfileData | null>(null)

  const [formData, setFormData] = useState<ProfileData>({
    name: "",
    location: "",
    openingHours: "",
    description: "",
    phone: "",
    email: "",
    address: {
      street: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
    },
    socialMedia: {
      facebook: "",
      twitter: "",
      instagram: "",
    },
  })

  // Load profile data
  useEffect(() => {
    if (!restaurant?.id) return

    const loadProfile = async () => {
      try {
        setLoading(true)
        const dbProfile = await getRestaurantProfile(restaurant.id)

        if (dbProfile) {
          const profileData: ProfileData = {
            name: dbProfile.name || "",
            location: dbProfile.location || "",
            openingHours: dbProfile.openingHours || "",
            description: dbProfile.description || "",
            phone: dbProfile.phone || "",
            email: dbProfile.email || "",
            address: dbProfile.address ? {
              street: dbProfile.address.street || "",
              city: dbProfile.address.city || "",
              state: dbProfile.address.state || "",
              zipCode: dbProfile.address.zipCode || "",
              country: dbProfile.address.country || "",
            } : {
              street: "",
              city: "",
              state: "",
              zipCode: "",
              country: "",
            },
            socialMedia: dbProfile.socialMedia ? {
              facebook: dbProfile.socialMedia.facebook || "",
              twitter: dbProfile.socialMedia.twitter || "",
              instagram: dbProfile.socialMedia.instagram || "",
            } : {
              facebook: "",
              twitter: "",
              instagram: "",
            },
          }
          setProfile(profileData)
          setFormData(profileData)
        } else {
          // Initialize with restaurant name and email if no profile exists
          setFormData({
            ...formData,
            name: restaurant.name || "",
            email: restaurant.email || "",
          })
        }
      } catch (error) {
        console.error("Error loading profile:", error)
        toast.error("Failed to load profile")
      } finally {
        setLoading(false)
      }
    }

    loadProfile()
  }, [restaurant?.id])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prevData) => {
      if (name.includes(".")) {
        const [section, field] = name.split(".")
        return {
          ...prevData,
          [section]: {
            ...(prevData[section as keyof ProfileData] as Record<string, string>),
            [field]: value,
          },
        }
      }
      return { ...prevData, [name]: value }
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!restaurant?.id) {
      toast.error("Restaurant not found")
      return
    }

    try {
      setSaving(true)
      await saveRestaurantProfile(restaurant.id, formData)
      setProfile(formData)
      setIsEditing(false)
      toast.success("Profile saved successfully")
    } catch (error) {
      console.error("Error saving profile:", error)
      toast.error("Failed to save profile")
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
      </div>
    )
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Restaurant Profile</CardTitle>
      </CardHeader>
      <CardContent>
        {isEditing ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Restaurant Name *</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="location">Location</Label>
              <Input id="location" name="location" value={formData.location} onChange={handleInputChange} />
            </div>
            <div>
              <Label htmlFor="openingHours">Opening Hours</Label>
              <Input
                id="openingHours"
                name="openingHours"
                value={formData.openingHours}
                onChange={handleInputChange}
                placeholder="e.g., Mon-Fri: 9AM-10PM"
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" name="phone" value={formData.phone} onChange={handleInputChange} />
            </div>
            <div>
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                autoComplete="email"
                required
              />
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
            <div className="flex gap-2">
              <Button type="submit" disabled={saving}>
                {saving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save Profile"
                )}
              </Button>
              <Button type="button" variant="outline" onClick={() => setIsEditing(false)} disabled={saving}>
                Cancel
              </Button>
            </div>
          </form>
        ) : profile ? (
          <div className="space-y-4">
            <div>
              <strong>Name:</strong> {profile.name}
            </div>
            {profile.location && (
              <div>
                <strong>Location:</strong> {profile.location}
              </div>
            )}
            {profile.openingHours && (
              <div>
                <strong>Opening Hours:</strong> {profile.openingHours}
              </div>
            )}
            {profile.description && (
              <div>
                <strong>Description:</strong> {profile.description}
              </div>
            )}
            {profile.phone && (
              <div>
                <strong>Phone:</strong> {profile.phone}
              </div>
            )}
            {profile.email && (
              <div>
                <strong>Email:</strong> {profile.email}
              </div>
            )}
            {(profile.address.street ||
              profile.address.city ||
              profile.address.state ||
              profile.address.zipCode ||
              profile.address.country) && (
              <div>
                <strong>Address:</strong>
                <div className="ml-4 mt-1">
                  {profile.address.street && <p>{profile.address.street}</p>}
                  {(profile.address.city || profile.address.state || profile.address.zipCode) && (
                    <p>
                      {profile.address.city}
                      {profile.address.city && profile.address.state ? ", " : ""}
                      {profile.address.state} {profile.address.zipCode}
                    </p>
                  )}
                  {profile.address.country && <p>{profile.address.country}</p>}
                </div>
              </div>
            )}
            {(profile.socialMedia.facebook || profile.socialMedia.twitter || profile.socialMedia.instagram) && (
              <div>
                <strong>Social Media:</strong>
                <div className="ml-4 mt-1">
                  {profile.socialMedia.facebook && <p>Facebook: {profile.socialMedia.facebook}</p>}
                  {profile.socialMedia.twitter && <p>Twitter: {profile.socialMedia.twitter}</p>}
                  {profile.socialMedia.instagram && <p>Instagram: {profile.socialMedia.instagram}</p>}
                </div>
              </div>
            )}
          </div>
        ) : (
          <p>No profile information available. Click Edit to add your restaurant details.</p>
        )}
      </CardContent>
      <CardFooter>
        {!isEditing && (
          <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
        )}
      </CardFooter>
    </Card>
  )
}
