import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Globe, Building2, Users, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

const Brands = () => {
  const brands = [
    {
      id: 1,
      name: "Tiryaki Yazılım",
      description: "Yazılım geliştirme ve dijital çözümler şirketi",
      logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=500",
      website: "https://tiryakiyazilim.com",
      category: "Teknoloji",
      year: "2024",
      services: ["Web Geliştirme", "Mobil Uygulama", "E-ticaret", "Kurumsal Çözümler"],
      technologies: ["React", "Node.js", "Swift", "PostgreSQL"]
    },
    {
      id: 2,
      name: "Odak Software",
      description: "Endüstriyel otomasyon ve kontrol sistemleri",
      logo: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500",
      website: "https://odaksoftware.com",
      category: "Endüstriyel",
      year: "2024",
      services: ["E-ticaret Platformu", "Stok Yönetimi", "Güvenli Ödeme"],
      technologies: ["React", "Node.js", "PostgreSQL", "Stripe"]
    },
    {
      id: 3,
      name: "Figrinova",
      description: "İnovatif çözümler ve teknoloji hizmetleri",
      logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=500",
      website: "https://figrinova.com",
      category: "Teknoloji",
      year: "2024",
      services: ["Web Geliştirme", "Mobil Uygulama", "UI/UX Tasarım", "Dijital Pazarlama"],
      technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS"]
    },
    {
      id: 4,
      name: "Kodlasa",
      description: "Eğitim ve geliştirme platformu",
      logo: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500",
      website: "https://kodlasa.com",
      category: "Eğitim",
      year: "2024",
      services: ["Eğitim Platformu", "Kodlama Dersleri", "Proje Geliştirme", "Mentorluk"],
      technologies: ["React", "Node.js", "MongoDB", "Socket.io"]
    }
  ];

  return (
    <section className="py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-gradient">Oluşturduğum Markalar</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Farklı sektörlerde çalıştığım kurumlar ve onlar için geliştirdiğim dijital çözümler. 
            Her proje, müşteri ihtiyaçlarını anlayarak özel olarak tasarlandı.
          </p>
        </div>

        {/* Brands Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {brands.map((brand) => (
            <Card 
              key={brand.id}
              className="card-gradient card-shadow border-border/50 hover:border-primary/50 transition-all duration-300 hover:scale-105 overflow-hidden group"
            >
              <div className="relative overflow-hidden">
                <div className="w-full h-48 bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                  <Building2 className="h-16 w-16 text-primary/60" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                  <Badge variant="secondary" className="text-xs">
                    {brand.category}
                  </Badge>
                </div>
              </div>
              
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold mb-2">{brand.name}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {brand.description}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {brand.year}
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    {brand.category}
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="font-semibold text-sm mb-2">Hizmetler</h4>
                  <div className="flex flex-wrap gap-1">
                    {brand.services.map((service) => (
                      <Badge key={service} variant="secondary" className="text-xs px-2 py-1">
                        {service}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="font-semibold text-sm mb-2">Teknolojiler</h4>
                  <div className="flex flex-wrap gap-1">
                    {brand.technologies.map((tech) => (
                      <Badge key={tech} variant="outline" className="text-xs px-2 py-1">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full"
                  onClick={() => window.open(brand.website, '_blank')}
                >
                  <Globe className="mr-2 h-4 w-4" />
                  Web Sitesini Ziyaret Et
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-20">
          <Card className="card-gradient card-shadow border-border/50">
            <CardContent className="pt-8">
              <div className="grid md:grid-cols-3 gap-8 text-center">
                <div>
                  <div className="text-3xl font-bold text-gradient mb-2">{brands.length}</div>
                  <div className="text-muted-foreground">Toplam Marka</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-gradient mb-2">{brands.filter(b => b.category === "Teknoloji").length}</div>
                  <div className="text-muted-foreground">Teknoloji</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-gradient mb-2">{brands.filter(b => b.category === "Endüstriyel").length}</div>
                  <div className="text-muted-foreground">Endüstriyel</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <p className="text-muted-foreground mb-6">
            Markanız için profesyonel dijital çözümler geliştirmek istiyorsanız
          </p>
          <Button 
            size="lg" 
            className="px-8 hero-gradient"
            onClick={() => {
              const contactSection = document.getElementById('contact');
              if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            <ExternalLink className="mr-2 h-5 w-5" />
            İletişime Geç
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Brands; 