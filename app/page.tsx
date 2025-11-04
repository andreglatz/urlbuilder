"use client";

import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupInput,
  InputGroupAddon,
  InputGroupButton,
} from "@/components/ui/input-group";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useState, useMemo, useCallback } from "react";
import {
  Copy,
  Check,
  Database,
  Server,
  User,
  Lock,
  Hash,
  Layers,
} from "lucide-react";

export default function Home() {
  const [host, setHost] = useState("localhost");
  const [port, setPort] = useState("5432");
  const [user, setUser] = useState("postgres");
  const [password, setPassword] = useState("");
  const [database, setDatabase] = useState("mydb");
  const [schema, setSchema] = useState("");
  const [copied, setCopied] = useState(false);

  // Build the PostgreSQL connection string - memoized to avoid recalculation
  const connectionString = useMemo(() => {
    const baseUrl = `postgresql://${user}${password ? `:${password}` : ""}@${host}${port ? `:${port}` : ""}/${database}`;
    return schema ? `${baseUrl}?options=-csearch_path=${schema}` : baseUrl;
  }, [user, password, host, port, database, schema]);

  // Memoize the copy handler to avoid recreating on each render
  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(connectionString);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  }, [connectionString]);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 md:py-20 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <Badge variant="secondary" className="mb-4 px-4 py-2 text-base">
            <Database className="w-4 h-4" />
            PostgreSQL
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-3 text-foreground">
            Connection URL Builder
          </h1>
          <p className="text-muted-foreground text-lg">
            Generate connection strings for your PostgreSQL database
          </p>
        </div>

        {/* Main Card */}
        <Card>
          <CardHeader>
            <CardTitle>Database Configuration</CardTitle>
            <CardDescription>
              Enter your database credentials to generate a connection string
            </CardDescription>
          </CardHeader>

          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Host Field */}
              <Field>
                <FieldLabel className="flex items-center gap-2">
                  <Server className="w-4 h-4 text-muted-foreground" />
                  Host
                </FieldLabel>
                <Input
                  placeholder="localhost"
                  value={host}
                  onChange={(e) => setHost(e.target.value)}
                  autoComplete="off"
                />
              </Field>

              {/* Port Field */}
              <Field>
                <FieldLabel className="flex items-center gap-2">
                  <Hash className="w-4 h-4 text-muted-foreground" />
                  Port
                </FieldLabel>
                <Input
                  placeholder="5432"
                  value={port}
                  onChange={(e) => setPort(e.target.value)}
                  autoComplete="off"
                  inputMode="numeric"
                />
              </Field>

              {/* User Field */}
              <Field>
                <FieldLabel className="flex items-center gap-2">
                  <User className="w-4 h-4 text-muted-foreground" />
                  User
                </FieldLabel>
                <Input
                  placeholder="postgres"
                  value={user}
                  onChange={(e) => setUser(e.target.value)}
                  autoComplete="username"
                />
              </Field>

              {/* Password Field */}
              <Field>
                <FieldLabel className="flex items-center gap-2">
                  <Lock className="w-4 h-4 text-muted-foreground" />
                  Password
                </FieldLabel>
                <Input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Field>

              {/* Database Field */}
              <Field>
                <FieldLabel className="flex items-center gap-2">
                  <Database className="w-4 h-4 text-muted-foreground" />
                  Database
                </FieldLabel>
                <Input
                  placeholder="mydb"
                  value={database}
                  onChange={(e) => setDatabase(e.target.value)}
                  autoComplete="off"
                />
              </Field>

              {/* Schema Field */}
              <Field>
                <FieldLabel className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-muted-foreground" />
                  Schema{" "}
                  <span className="text-xs text-muted-foreground">
                    (optional)
                  </span>
                </FieldLabel>
                <Input
                  placeholder="public"
                  value={schema}
                  onChange={(e) => setSchema(e.target.value)}
                  autoComplete="off"
                />
              </Field>
            </div>

            <Separator className="my-6" />

            {/* Connection String Output */}
            <Field>
              <div className="flex items-center justify-between mb-2">
                <FieldLabel>Connection String</FieldLabel>
                {connectionString && (
                  <Badge variant="outline" className="text-xs">
                    {connectionString.length} characters
                  </Badge>
                )}
              </div>
              <InputGroup>
                <InputGroupInput
                  value={connectionString}
                  readOnly
                  className="font-mono text-sm"
                  aria-label="Generated connection string"
                />
                <InputGroupAddon align="inline-end">
                  <InputGroupButton
                    onClick={handleCopy}
                    size="sm"
                    aria-label="Copy to clipboard"
                  >
                    {copied ? (
                      <>
                        <Check className="size-4" />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy className="size-4" />
                        Copy
                      </>
                    )}
                  </InputGroupButton>
                </InputGroupAddon>
              </InputGroup>
            </Field>
          </CardContent>

          <CardFooter className="flex-col items-start gap-4">
            <Separator />
            <div className="w-full">
              <p className="text-sm text-muted-foreground">
                <strong className="font-semibold text-foreground">
                  Format:
                </strong>{" "}
                <code className="px-2 py-1 rounded-md bg-muted font-mono text-xs">
                  postgresql://user:password@host:port/database?options=-csearch_path=schema
                </code>
              </p>
            </div>
          </CardFooter>
        </Card>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-sm text-muted-foreground">
            All data stays in your browser. Nothing is sent to any server.
          </p>
        </div>
      </div>
    </div>
  );
}
