import { useState } from "react";
import { useNavigate } from "react-router-dom";
import HostNavigation from "@/components/HostNavigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, Upload, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AddListing = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [images, setImages] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Listing Created!",
      description: "Your property has been successfully added. It will be reviewed within 24 hours.",
    });
    navigate("/host/listings");
  };

  const handleImageUpload = () => {
    setImages([...images,]);
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  return (
    <div className="flex min-h-screen bg-background">
      <HostNavigation />

      <main className="flex-1 overflow-auto">
        <div className="p-8 max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <Button
              variant="ghost"
              onClick={() => navigate("/host/listings")}
              className="mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Listings
            </Button>
            <h1 className="text-4xl font-bold mb-2">Add New Listing</h1>
            <p className="text-muted-foreground text-lg">
              Create a new property listing for monthly rentals
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Information */}
            <Card className="bg-gradient-card shadow-soft">
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Property Title *</Label>
                  <Input
                    id="title"
                    placeholder="e.g., Modern Studio in Barcelona City Center"
                    required
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City *</Label>
                    <Input id="city" placeholder="Barcelona" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="country">Country *</Label>
                    <Input id="country" placeholder="Spain" required />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Full Address *</Label>
                  <Input
                    id="address"
                    placeholder="123 Main Street, Barcelona, 08001"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your property, highlight key features, and what makes it perfect for remote workers..."
                    rows={5}
                    required
                  />
                </div>
              </CardContent>
            </Card>

            {/* Property Details */}
            <Card className="bg-gradient-card shadow-soft">
              <CardHeader>
                <CardTitle>Property Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="bedrooms">Bedrooms *</Label>
                    <Select required>
                      <SelectTrigger id="bedrooms">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="studio">Studio</SelectItem>
                        <SelectItem value="1">1 Bedroom</SelectItem>
                        <SelectItem value="2">2 Bedrooms</SelectItem>
                        <SelectItem value="3">3+ Bedrooms</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bathrooms">Bathrooms *</Label>
                    <Select required>
                      <SelectTrigger id="bathrooms">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 Bathroom</SelectItem>
                        <SelectItem value="1.5">1.5 Bathrooms</SelectItem>
                        <SelectItem value="2">2 Bathrooms</SelectItem>
                        <SelectItem value="2.5">2.5+ Bathrooms</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="capacity">Max Guests *</Label>
                    <Input id="capacity" type="number" min="1" max="10" placeholder="2" required />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="price">Monthly Price (USD) *</Label>
                  <Input
                    id="price"
                    type="number"
                    min="0"
                    step="50"
                    placeholder="1200"
                    required
                  />
                  <p className="text-xs text-muted-foreground">
                    Set a competitive price based on location and amenities
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Amenities */}
            <Card className="bg-gradient-card shadow-soft">
              <CardHeader>
                <CardTitle>Amenities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    { id: "wifi", label: "High-Speed WiFi" },
                    { id: "workspace", label: "Dedicated Workspace" },
                    { id: "kitchen", label: "Full Kitchen" },
                    { id: "ac", label: "Air Conditioning" },
                    { id: "heating", label: "Heating" },
                    { id: "washer", label: "Washer/Dryer" },
                    { id: "tv", label: "Smart TV" },
                    { id: "parking", label: "Parking" },
                    { id: "gym", label: "Gym Access" },
                    { id: "pool", label: "Pool" },
                    { id: "balcony", label: "Balcony/Patio" },
                    { id: "pets", label: "Pet Friendly" },
                  ].map((amenity) => (
                    <div key={amenity.id} className="flex items-center space-x-2">
                      <Checkbox id={amenity.id} />
                      <Label htmlFor={amenity.id} className="cursor-pointer">
                        {amenity.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Images */}
            <Card className="bg-gradient-card shadow-soft">
              <CardHeader>
                <CardTitle>Property Images</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Upload high-quality images of your property. First image will be the cover photo.
                </p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {images.map((image, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={image}
                        alt={`Property ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-2 right-2 w-6 h-6 bg-destructive text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-4 h-4" />
                      </button>
                      {index === 0 && (
                        <span className="absolute bottom-2 left-2 px-2 py-1 bg-primary text-white text-xs rounded">
                          Cover
                        </span>
                      )}
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={handleImageUpload}
                    className="h-32 border-2 border-dashed border-border rounded-lg flex flex-col items-center justify-center gap-2 hover:border-primary hover:bg-ocean-light/20 transition-colors"
                  >
                    <Upload className="w-6 h-6 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Upload Images</span>
                  </button>
                </div>
              </CardContent>
            </Card>

            {/* Submit */}
            <div className="flex justify-end gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/host/listings")}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                size="lg"
                className="bg-gradient-hero shadow-soft hover:shadow-glow transition-all"
              >
                Create Listing
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default AddListing;
