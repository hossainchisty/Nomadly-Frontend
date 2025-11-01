import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Star, Users, Wifi } from "lucide-react";
import { Link } from "react-router-dom";
import NomadlyScoreBadge from "./NomadlyScoreBadge";

interface PropertyCardProps {
  id: string;
  title: string;
  location: string;
  price: number;
  image: string;
  orcaScore: number;
  rating: number;
  reviews: number;
  amenities: {
    wifi: boolean;
    capacity: number;
  };
}

const PropertyCard = ({
  id,
  title,
  location,
  price,
  image,
  orcaScore,
  rating,
  reviews,
  amenities,
}: PropertyCardProps) => {
  return (
    <Link to={`/property/${id}`}>
      <Card className="group overflow-hidden border border-border hover:shadow-large transition-all duration-300 hover:-translate-y-1 bg-gradient-card">
        {/* Image */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute top-3 right-3">
            <NomadlyScoreBadge score={orcaScore} size="sm" showLabel={false} />
          </div>
          <div className="absolute top-3 left-3">
            <Badge className="bg-background/90 backdrop-blur-sm text-foreground border-0">
              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400 mr-1" />
              {rating} ({reviews})
            </Badge>
          </div>
        </div>

        <CardContent className="p-4">
          {/* Location */}
          <div className="flex items-center gap-1 text-muted-foreground text-sm mb-2">
            <MapPin className="w-4 h-4" />
            <span>{location}</span>
          </div>

          {/* Title */}
          <h3 className="font-semibold text-lg text-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors">
            {title}
          </h3>

          {/* Amenities */}
          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
            {amenities.wifi && (
              <div className="flex items-center gap-1">
                <Wifi className="w-4 h-4" />
                <span>High-Speed</span>
              </div>
            )}
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              <span>Up to {amenities.capacity}</span>
            </div>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-1 pt-3 border-t border-border">
            <span className="text-2xl font-bold text-primary">${price}</span>
            <span className="text-sm text-muted-foreground">/month</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default PropertyCard;
