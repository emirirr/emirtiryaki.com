import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Github, ExternalLink, Eye, ArrowLeft, Calendar, Users, Code, Clock, Users as TeamIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import React from "react";
import { projects, categories } from "@/data/projects";

const ProjectsPage = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = React.useState("Tümü");

  const filteredProjects = selectedCategory === "Tümü" 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/')}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Ana Sayfa
            </Button>
            <h1 className="text-2xl font-bold text-gradient">Projelerim</h1>
            <div className="w-20"></div> {/* Spacer for centering */}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-gradient">Projelerim</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Geliştirdiğim projeler ve kullandığım teknolojiler. Her proje, 
            problem çözme yaklaşımımı ve teknik becerilerimi yansıtıyor.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex justify-center mb-12">
          <div className="flex gap-2 p-1 bg-muted/30 rounded-lg">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "ghost"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="px-4"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => {
            const IconComponent = project.icon;
            return (
              <Card 
                key={project.id}
                className="card-gradient card-shadow border-border/50 hover:border-primary/50 transition-all duration-300 hover:scale-105 overflow-hidden group"
              >
                <div className="relative overflow-hidden">
                  <div className="w-full h-48 bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                    <IconComponent className="h-16 w-16 text-primary/60" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                    <Button 
                      size="sm" 
                      variant="secondary" 
                      className="h-8 w-8 p-0"
                      onClick={() => window.open(project.github, '_blank')}
                    >
                      <Github className="h-4 w-4" />
                    </Button>
                    {project.link !== "https://emirtiryaki.com" && (
                      <Button 
                        size="sm" 
                        variant="secondary" 
                        className="h-8 w-8 p-0"
                        onClick={() => window.open(project.link, '_blank')}
                      >
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  <div className="absolute top-4 left-4">
                    <Badge variant="secondary" className="text-xs">
                      {project.category}
                    </Badge>
                  </div>
                </div>
                
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <CardTitle className="text-xl">{project.title}</CardTitle>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {project.duration}
                    </div>
                    <div className="flex items-center gap-1">
                      <TeamIcon className="h-3 w-3" />
                      {project.teamSize}
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech) => (
                      <Badge key={tech} variant="secondary" className="text-xs px-2 py-1">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => window.open(project.github, '_blank')}
                    >
                      <Github className="mr-2 h-4 w-4" />
                      Kod
                    </Button>
                    {project.link !== "https://emirtiryaki.com" && (
                      <Button 
                        size="sm" 
                        className="flex-1 hero-gradient"
                        onClick={() => window.open(project.link, '_blank')}
                      >
                        <Eye className="mr-2 h-4 w-4" />
                        Demo
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Stats Section */}
        <div className="mt-20">
          <Card className="card-gradient card-shadow border-border/50">
            <CardContent className="pt-8">
              <div className="grid md:grid-cols-4 gap-8 text-center">
                <div>
                  <div className="text-3xl font-bold text-gradient mb-2">{projects.length}</div>
                  <div className="text-muted-foreground">Toplam Proje</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-gradient mb-2">{projects.filter(p => p.category === "Web Uygulaması").length}</div>
                  <div className="text-muted-foreground">Web Uygulaması</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-gradient mb-2">{projects.filter(p => p.category === "Mobil Uygulama").length}</div>
                  <div className="text-muted-foreground">Mobil Uygulama</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-gradient mb-2">{projects.filter(p => p.category === "E-ticaret").length}</div>
                  <div className="text-muted-foreground">E-ticaret</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <p className="text-muted-foreground mb-6">
            Daha fazla proje ve güncelleme için GitHub profilimi takip edin
          </p>
          <Button 
            size="lg" 
            variant="outline" 
            className="px-8"
            onClick={() => window.open('https://github.com/emirirr', '_blank')}
          >
            <Github className="mr-2 h-5 w-5" />
            GitHub Profilim
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage; 